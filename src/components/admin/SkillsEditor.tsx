
import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SkillCategory, StatsItem, fetchSkillsData, fetchStatsItems } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { PlusIcon, Pencil, Trash2, Save } from 'lucide-react';

export const SkillsEditor: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
  const [statsItems, setStatsItems] = useState<StatsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("skills");
  
  // Skills state
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [currentSkillCategory, setCurrentSkillCategory] = useState<Partial<SkillCategory>>({});
  const [currentSkill, setCurrentSkill] = useState<{name: string, level: number}>({name: "", level: 75});
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [skillsChanged, setSkillsChanged] = useState(false);
  
  // Stats state
  const [isStatDialogOpen, setIsStatDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<Partial<StatsItem>>({});
  const [isEditingStat, setIsEditingStat] = useState(false);
  const [statsChanged, setStatsChanged] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const skills = await fetchSkillsData();
      if (skills) {
        setSkillsData(skills);
      } else {
        setSkillsData([]);
      }
      
      const stats = await fetchStatsItems();
      if (stats) {
        setStatsItems(stats);
      } else {
        setStatsItems([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data from Firebase");
    } finally {
      setLoading(false);
    }
  };

  // Skills management
  const handleAddCategory = () => {
    setCurrentSkillCategory({
      title: '',
      skills: []
    });
    setIsEditingCategory(false);
    setIsSkillDialogOpen(true);
  };

  const handleEditCategory = (category: SkillCategory) => {
    setCurrentSkillCategory({...category});
    setIsEditingCategory(true);
    setIsSkillDialogOpen(true);
  };

  const handleAddSkill = () => {
    if (!currentSkillCategory.skills) {
      setCurrentSkillCategory({
        ...currentSkillCategory,
        skills: [{name: currentSkill.name, level: currentSkill.level}]
      });
    } else {
      setCurrentSkillCategory({
        ...currentSkillCategory,
        skills: [...currentSkillCategory.skills, {name: currentSkill.name, level: currentSkill.level}]
      });
    }
    setCurrentSkill({name: "", level: 75});
  };

  const handleRemoveSkill = (index: number) => {
    if (currentSkillCategory.skills) {
      const updatedSkills = [...currentSkillCategory.skills];
      updatedSkills.splice(index, 1);
      setCurrentSkillCategory({
        ...currentSkillCategory,
        skills: updatedSkills
      });
    }
  };

  const handleSaveCategory = async () => {
    try {
      if (!currentSkillCategory.title || !currentSkillCategory.skills || currentSkillCategory.skills.length === 0) {
        toast.error("Please add a title and at least one skill");
        return;
      }

      // Create a cleaned version to save to Firestore
      const categoryToSave = {
        title: currentSkillCategory.title,
        skills: currentSkillCategory.skills
      };

      if (isEditingCategory) {
        // Find the index of the category we're editing
        const index = skillsData.findIndex(cat => cat.title === currentSkillCategory.title);
        
        // Update in Firestore
        await setDoc(doc(db, 'skills', `skill_${index}`), categoryToSave);
        
        // Update local state
        const updatedSkills = [...skillsData];
        updatedSkills[index] = categoryToSave as SkillCategory;
        setSkillsData(updatedSkills);
      } else {
        // Add new category to Firestore
        await addDoc(collection(db, 'skills'), categoryToSave);
        
        // Reload skills data
        const updatedSkills = await fetchSkillsData();
        if (updatedSkills) {
          setSkillsData(updatedSkills);
        }
      }
      
      setIsSkillDialogOpen(false);
      toast.success(`Skill category ${isEditingCategory ? 'updated' : 'added'} successfully`);
      setSkillsChanged(false);
    } catch (error) {
      console.error("Error saving skill category:", error);
      toast.error("Failed to save skill category");
    }
  };

  const handleDeleteCategory = async (category: SkillCategory) => {
    try {
      // Find the index of the category
      const index = skillsData.findIndex(cat => cat.title === category.title);
      
      // Delete from Firestore
      await deleteDoc(doc(db, 'skills', `skill_${index}`));
      
      // Update local state
      const updatedSkills = skillsData.filter(cat => cat.title !== category.title);
      setSkillsData(updatedSkills);
      
      toast.success("Skill category deleted successfully");
    } catch (error) {
      console.error("Error deleting skill category:", error);
      toast.error("Failed to delete skill category");
    }
  };

  // Stats management
  const handleAddStat = () => {
    setCurrentStat({
      number: '',
      label: ''
    });
    setIsEditingStat(false);
    setIsStatDialogOpen(true);
  };

  const handleEditStat = (stat: StatsItem) => {
    setCurrentStat({...stat});
    setIsEditingStat(true);
    setIsStatDialogOpen(true);
  };

  const handleSaveStat = async () => {
    try {
      if (!currentStat.number || !currentStat.label) {
        toast.error("Please fill all required fields");
        return;
      }

      const statToSave = {
        number: currentStat.number,
        label: currentStat.label
      };

      if (isEditingStat) {
        // Find the index of the stat we're editing
        const index = statsItems.findIndex(s => s.number === currentStat.number && s.label === currentStat.label);
        
        // Update in Firestore
        await setDoc(doc(db, 'stats', `stat_${index}`), statToSave);
        
        // Update local state
        const updatedStats = [...statsItems];
        updatedStats[index] = statToSave as StatsItem;
        setStatsItems(updatedStats);
      } else {
        // Add new stat to Firestore
        await addDoc(collection(db, 'stats'), statToSave);
        
        // Reload stats data
        const updatedStats = await fetchStatsItems();
        if (updatedStats) {
          setStatsItems(updatedStats);
        }
      }
      
      setIsStatDialogOpen(false);
      toast.success(`Stat ${isEditingStat ? 'updated' : 'added'} successfully`);
      setStatsChanged(false);
    } catch (error) {
      console.error("Error saving stat:", error);
      toast.error("Failed to save stat");
    }
  };

  const handleDeleteStat = async (stat: StatsItem) => {
    try {
      // Find the index of the stat
      const index = statsItems.findIndex(s => s.number === stat.number && s.label === stat.label);
      
      // Delete from Firestore
      await deleteDoc(doc(db, 'stats', `stat_${index}`));
      
      // Update local state
      const updatedStats = statsItems.filter(s => !(s.number === stat.number && s.label === stat.label));
      setStatsItems(updatedStats);
      
      toast.success("Stat deleted successfully");
    } catch (error) {
      console.error("Error deleting stat:", error);
      toast.error("Failed to delete stat");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="skills">Skills Categories</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="skills" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Skills Categories</h2>
            <Button onClick={handleAddCategory} className="flex items-center gap-2">
              <PlusIcon size={16} />
              Add Category
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsData.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No skill categories found. Add one to get started.
                </CardContent>
              </Card>
            ) : (
              skillsData.map((category, index) => (
                <Card key={index} className="glass-morphism border border-white/10">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <CardTitle>{category.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteCategory(category)}
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-primary rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Statistics</h2>
            <Button onClick={handleAddStat} className="flex items-center gap-2">
              <PlusIcon size={16} />
              Add Stat
            </Button>
          </div>
          
          <Card className="glass-morphism border border-white/10">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Number</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statsItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No stats found. Add one to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    statsItems.map((stat, index) => (
                      <TableRow key={index}>
                        <TableCell>{stat.number}</TableCell>
                        <TableCell>{stat.label}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStat(stat)}
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteStat(stat)}
                            >
                              <Trash2 size={16} className="text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Skills Dialog */}
      <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditingCategory ? 'Edit Skill Category' : 'Add Skill Category'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryTitle">Category Title</Label>
              <Input
                id="categoryTitle"
                value={currentSkillCategory.title || ''}
                onChange={(e) => {
                  setCurrentSkillCategory({...currentSkillCategory, title: e.target.value});
                  setSkillsChanged(true);
                }}
                placeholder="e.g. Design, Animation, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Skills</Label>
              {currentSkillCategory.skills && currentSkillCategory.skills.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {currentSkillCategory.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">No skills yet. Add some below.</p>
              )}
              
              <div className="space-y-4 border border-white/10 rounded-md p-4">
                <div className="space-y-2">
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={currentSkill.name}
                    onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                    placeholder="e.g. Photoshop, After Effects, etc."
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="skillLevel">Skill Level: {currentSkill.level}%</Label>
                  </div>
                  <Slider
                    id="skillLevel"
                    min={0}
                    max={100}
                    step={5}
                    value={[currentSkill.level]}
                    onValueChange={(value) => setCurrentSkill({...currentSkill, level: value[0]})}
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  disabled={!currentSkill.name}
                  className="w-full"
                >
                  Add Skill
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveCategory}>Save Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Stats Dialog */}
      <Dialog open={isStatDialogOpen} onOpenChange={setIsStatDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditingStat ? 'Edit Stat' : 'Add Stat'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="statNumber">Number</Label>
              <Input
                id="statNumber"
                value={currentStat.number || ''}
                onChange={(e) => {
                  setCurrentStat({...currentStat, number: e.target.value});
                  setStatsChanged(true);
                }}
                placeholder="e.g. 5+, 100%, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="statLabel">Label</Label>
              <Input
                id="statLabel"
                value={currentStat.label || ''}
                onChange={(e) => {
                  setCurrentStat({...currentStat, label: e.target.value});
                  setStatsChanged(true);
                }}
                placeholder="e.g. Years Experience, Projects Completed, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveStat}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
