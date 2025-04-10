
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-card text-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">SYNQ</h3>
            <p className="text-muted-foreground">
              The Tech Empire That Does It All.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">AI Solutions</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Cybersecurity</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Data Science</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Educational Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="mailto:contact@synqtech.com" className="text-muted-foreground hover:text-primary transition-colors">synqthefuture@gmail.com</a></li>
              <li><a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">+91 999999999</a></li>
              <li><span className="text-muted-foreground">Trichy, Tamil Nadu</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SYNQ. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={scrollToTop}
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
