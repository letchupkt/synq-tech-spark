
import { Github, Instagram, Linkedin } from 'lucide-react';

const FounderSection = () => {
  return (
    <section id="founder" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Meet Our Founder</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden mx-auto border-4 border-primary/20">
              <img src="https://raw.githubusercontent.com/letchupkt/synq-tech-spark/1bb3f43f97dbcab562a4f52d039e66100d3bf45d/public/letchu.png" alt="Lakshmikanthan K" class="absolute inset-0 w-full h-full object-cover"/>
              
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold font-poppins mb-2">Lakshmikanthan K</h3>
            <p className="text-primary font-medium mb-6">Founder & CEO</p>
            
            <p className="text-lg text-muted-foreground mb-4">
              As a BTech student in AI & Data Science from SRCE, Lakshmikanthan (known as Letchu) founded SYNQ with a vision 
              to empower fellow students through technology and innovation.
            </p>
            
            <p className="text-muted-foreground mb-6">
              Passionate about bridging the gap between academic learning and practical application, 
              Lakshmikanthan has led multiple student-focused tech initiatives that combine cutting-edge 
              technology with accessible solutions. His commitment to student empowerment drives SYNQ's 
              mission to create tools that prepare the next generation of tech leaders.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/in/lakshmikanthank" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/letchupkt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://instagram.com/letchu_pkt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
