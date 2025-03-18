
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HeroContent, fetchHeroContent } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const HeroEditor: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    heading: '',
    subheading: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    setLoading(true);
    try {
      const content = await fetchHeroContent();
      if (content) {
        setHeroContent(content);
      }
    } catch (error) {
      console.error("Error loading hero content:", error);
      toast.error("Failed to load hero content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'hero'), heroContent);
      toast.success("Hero content saved successfully");
    } catch (error) {
      console.error("Error saving hero content:", error);
      toast.error("Failed to save hero content");
    } finally {
      setSaving(false);
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
    <Card className="glass-morphism border border-white/10">
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Edit the main heading and subheading for the hero section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="heading">Heading</Label>
          <Input
            id="heading"
            value={heroContent.heading}
            onChange={(e) => setHeroContent({...heroContent, heading: e.target.value})}
            placeholder="Main Heading"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subheading">Subheading</Label>
          <Input
            id="subheading"
            value={heroContent.subheading}
            onChange={(e) => setHeroContent({...heroContent, subheading: e.target.value})}
            placeholder="Subheading"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role/Position</Label>
          <Input
            id="role"
            value={heroContent.role}
            onChange={(e) => setHeroContent({...heroContent, role: e.target.value})}
            placeholder="Your role or position"
          />
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
