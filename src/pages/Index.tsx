
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FounderSection from '@/components/FounderSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import CommentSection from '@/components/CommentSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <CommentSection />
      <ContactSection />
      <Footer />
      
      {/* Admin Panel Link (Floating Button) */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link to="/admin">
          <Button variant="outline" className="rounded-full bg-background/80 backdrop-blur shadow-md flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Admin</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
