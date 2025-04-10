
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Database, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
              <span className="mr-1">✨</span> The Tech Empire That Does It All.
            </div>
            
            <h1 className="headline">
              Empowering Students Through <br />
              <span className="text-gradient">AI & Technology</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              SYNQ is a student-driven startup focused on bridging technology gaps with cutting-edge solutions in AI, Data Science, and Cybersecurity.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="button-primary group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="button-outline">
                View Projects
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">AI Solutions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Data Science</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm">Cybersecurity</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end relative">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-sm max-h-sm relative animate-float">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl transform rotate-6"></div>
                  <div className="absolute inset-0 bg-card rounded-lg shadow-lg transform -rotate-3">
                    <div className="p-6 h-full flex flex-col">
                      <div className="w-full h-40 bg-background/40 rounded-md mb-4"></div>
                      <div className="space-y-2">
                        <div className="w-3/4 h-4 bg-background/40 rounded"></div>
                        <div className="w-1/2 h-4 bg-background/40 rounded"></div>
                        <div className="w-5/6 h-4 bg-background/40 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
