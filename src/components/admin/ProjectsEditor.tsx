
import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, fetchAllProjects } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PlusIcon, Pencil, Trash2 } from 'lucide-react';

export const ProjectsEditor: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const projectsData = await fetchAllProjects();
      if (projectsData) {
        setProjects(projectsData);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentProject({
      id: Date.now(),
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      videoUrl: ''
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!currentProject.title || !currentProject.category || !currentProject.description || !currentProject.imageUrl) {
        toast.error("Please fill all required fields");
        return;
      }

      const projectData = {
        title: currentProject.title,
        category: currentProject.category,
        description: currentProject.description,
        imageUrl: currentProject.imageUrl,
        videoUrl: currentProject.videoUrl || '',
      };

      if (isEditing) {
        // Update existing project
        const projectRef = doc(db, 'projects', currentProject.id!.toString());
        await updateDoc(projectRef, projectData);
        toast.success("Project updated successfully");
      } else {
        // Add new project
        await addDoc(collection(db, 'projects'), projectData);
        toast.success("Project added successfully");
      }
      
      setIsDialogOpen(false);
      loadProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    }
  };

  const handleDelete = async (project: Project) => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'projects', project.id.toString()));
      toast.success("Project deleted successfully");
      loadProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <PlusIcon size={16} />
          Add New Project
        </Button>
      </div>

      <div className="glass-morphism border border-white/10 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No projects found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project)}
                        disabled={isDeleting}
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
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={currentProject.title || ''}
                onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                placeholder="Project Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={currentProject.category || ''}
                onChange={(e) => setCurrentProject({...currentProject, category: e.target.value})}
                placeholder="e.g. Motion Graphics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={currentProject.description || ''}
                onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                placeholder="Project Description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                value={currentProject.imageUrl || ''}
                onChange={(e) => setCurrentProject({...currentProject, imageUrl: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL (Optional)</Label>
              <Input
                id="videoUrl"
                value={currentProject.videoUrl || ''}
                onChange={(e) => setCurrentProject({...currentProject, videoUrl: e.target.value})}
                placeholder="https://www.youtube.com/embed/video-id"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
