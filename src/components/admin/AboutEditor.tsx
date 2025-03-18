
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AboutContent, fetchAboutContent } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { X, Plus } from 'lucide-react';

export const AboutEditor: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: '',
    description: [''],
    name: '',
    role: '',
    profileImage: '',
    socialLinks: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    setLoading(true);
    try {
      const content = await fetchAboutContent();
      if (content) {
        setAboutContent(content);
      }
    } catch (error) {
      console.error("Error loading about content:", error);
      toast.error("Failed to load about content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Clean up empty description paragraphs
      const cleanDescription = aboutContent.description.filter(para => para.trim() !== '');
      const updatedContent = { ...aboutContent, description: cleanDescription };
      
      await setDoc(doc(db, 'content', 'about'), updatedContent);
      setAboutContent(updatedContent);
      toast.success("About content saved successfully");
    } catch (error) {
      console.error("Error saving about content:", error);
      toast.error("Failed to save about content");
    } finally {
      setSaving(false);
    }
  };

  const handleAddParagraph = () => {
    setAboutContent({
      ...aboutContent,
      description: [...aboutContent.description, '']
    });
  };

  const handleRemoveParagraph = (index: number) => {
    const newDescription = [...aboutContent.description];
    newDescription.splice(index, 1);
    setAboutContent({
      ...aboutContent,
      description: newDescription
    });
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newDescription = [...aboutContent.description];
    newDescription[index] = value;
    setAboutContent({
      ...aboutContent,
      description: newDescription
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card className="glass-morphism border border-white/10">
      <CardHeader>
        <CardTitle>About Section</CardTitle>
        <CardDescription>Edit your personal information and about me section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={aboutContent.title}
            onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
            placeholder="About Me"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={aboutContent.name}
            onChange={(e) => setAboutContent({...aboutContent, name: e.target.value})}
            placeholder="Your Name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Role/Position</Label>
          <Input
            id="role"
            value={aboutContent.role}
            onChange={(e) => setAboutContent({...aboutContent, role: e.target.value})}
            placeholder="Your role or position"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="profileImage">Profile Image URL</Label>
          <Input
            id="profileImage"
            value={aboutContent.profileImage}
            onChange={(e) => setAboutContent({...aboutContent, profileImage: e.target.value})}
            placeholder="https://example.com/profile.jpg"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>About Description</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddParagraph}
              className="flex items-center gap-1"
            >
              <Plus size={14} />
              Add Paragraph
            </Button>
          </div>
          
          {aboutContent.description.map((paragraph, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                placeholder="Write your description paragraph here..."
                className="min-h-[100px]"
              />
              {aboutContent.description.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveParagraph(index)}
                  className="h-10 w-10 shrink-0"
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleSave} 
          className="mt-4 w-full"
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
