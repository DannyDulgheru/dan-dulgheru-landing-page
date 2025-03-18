
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SiteInfo, fetchSiteInfo } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { PlusIcon, X, Save } from 'lucide-react';

export const SiteInfoEditor: React.FC = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    siteName: '',
    siteTagline: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    contactLocation: '',
    socialLinks: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({
    platform: '',
    url: '',
    icon: ''
  });

  useEffect(() => {
    loadSiteInfo();
  }, []);

  const loadSiteInfo = async () => {
    setLoading(true);
    try {
      const info = await fetchSiteInfo();
      if (info) {
        setSiteInfo(info);
      }
    } catch (error) {
      console.error("Error loading site info:", error);
      toast.error("Failed to load site information");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'siteInfo'), siteInfo);
      toast.success("Site information saved successfully");
    } catch (error) {
      console.error("Error saving site info:", error);
      toast.error("Failed to save site information");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast.error("Platform and URL are required");
      return;
    }
    
    setSiteInfo({
      ...siteInfo,
      socialLinks: [...siteInfo.socialLinks, {
        platform: newSocialLink.platform,
        url: newSocialLink.url,
        icon: newSocialLink.icon || newSocialLink.platform.toLowerCase()
      }]
    });
    
    setNewSocialLink({
      platform: '',
      url: '',
      icon: ''
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = [...siteInfo.socialLinks];
    updatedLinks.splice(index, 1);
    setSiteInfo({
      ...siteInfo,
      socialLinks: updatedLinks
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
        <CardTitle>Site Information</CardTitle>
        <CardDescription>
          Edit general site information, contact details, and social media links.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={siteInfo.siteName}
              onChange={(e) => setSiteInfo({...siteInfo, siteName: e.target.value})}
              placeholder="Your Site Name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteTagline">Tagline</Label>
            <Input
              id="siteTagline"
              value={siteInfo.siteTagline}
              onChange={(e) => setSiteInfo({...siteInfo, siteTagline: e.target.value})}
              placeholder="Your site's tagline"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="siteDescription">Description</Label>
          <Input
            id="siteDescription"
            value={siteInfo.siteDescription}
            onChange={(e) => setSiteInfo({...siteInfo, siteDescription: e.target.value})}
            placeholder="Brief description of your site"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              value={siteInfo.contactEmail}
              onChange={(e) => setSiteInfo({...siteInfo, contactEmail: e.target.value})}
              placeholder="email@example.com"
              type="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              value={siteInfo.contactPhone}
              onChange={(e) => setSiteInfo({...siteInfo, contactPhone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactLocation">Location</Label>
            <Input
              id="contactLocation"
              value={siteInfo.contactLocation}
              onChange={(e) => setSiteInfo({...siteInfo, contactLocation: e.target.value})}
              placeholder="City, Country"
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <Label>Social Media Links</Label>
          </div>
          
          <div className="space-y-4">
            {siteInfo.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-secondary/10 px-3 py-1 rounded text-sm">
                  {link.platform}
                </div>
                <div className="flex-1 text-sm truncate">
                  {link.url}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSocialLink(index)}
                >
                  <X size={16} className="text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-white/10 rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                value={newSocialLink.platform}
                onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
                placeholder="e.g. Twitter, Instagram"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialUrl">URL</Label>
              <Input
                id="socialUrl"
                value={newSocialLink.url}
                onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                placeholder="https://example.com/profile"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (optional)</Label>
              <Input
                id="icon"
                value={newSocialLink.icon}
                onChange={(e) => setNewSocialLink({...newSocialLink, icon: e.target.value})}
                placeholder="lucide icon name"
              />
            </div>
            
            <Button 
              onClick={handleAddSocialLink}
              disabled={!newSocialLink.platform || !newSocialLink.url}
              className="md:col-span-3 flex items-center gap-2"
            >
              <PlusIcon size={16} />
              Add Social Link
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={handleSave} 
          className="mt-6 w-full flex items-center gap-2"
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
