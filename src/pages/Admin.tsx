
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { ProjectsEditor } from "@/components/admin/ProjectsEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeIcon, ImageIcon, LogOutIcon, DatabaseIcon, MailIcon, InfoIcon, LayersIcon } from "lucide-react";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { AboutEditor } from "@/components/admin/AboutEditor";
import { SkillsEditor } from "@/components/admin/SkillsEditor";
import { ContactSubmissionsViewer } from "@/components/admin/ContactSubmissionsViewer";
import { SiteInfoEditor } from "@/components/admin/SiteInfoEditor";

const Admin: React.FC = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!isLoading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, isLoading, navigate]);

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-morphism border-b border-white/10 py-4 px-6 sticky top-0 z-10 backdrop-blur-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentUser.email}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOutIcon size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full max-w-4xl mx-auto glass-morphism overflow-auto">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <HomeIcon size={16} />
              Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <InfoIcon size={16} />
              About
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <LayersIcon size={16} />
              Skills
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <ImageIcon size={16} />
              Projects
            </TabsTrigger>
            <TabsTrigger value="siteinfo" className="flex items-center gap-2">
              <DatabaseIcon size={16} />
              Site Info
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <MailIcon size={16} />
              Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <HeroEditor />
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <AboutEditor />
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <SkillsEditor />
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <ProjectsEditor />
          </TabsContent>
          
          <TabsContent value="siteinfo" className="space-y-4">
            <SiteInfoEditor />
          </TabsContent>
          
          <TabsContent value="submissions" className="space-y-4">
            <ContactSubmissionsViewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
