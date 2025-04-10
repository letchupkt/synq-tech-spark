
import { 
  BrainCircuit, 
  Shield, 
  Database, 
  Layers, 
  GraduationCap, 
  Code 
} from 'lucide-react';

const services = [
  {
    icon: <BrainCircuit size={40} className="text-primary" />,
    title: "AI Solutions",
    description: "Custom artificial intelligence solutions leveraging machine learning and natural language processing to solve complex problems.",
  },
  {
    icon: <Shield size={40} className="text-primary" />,
    title: "Cybersecurity Tools",
    description: "Advanced security solutions to protect digital assets and enhance awareness about cyber threats among students.",
  },
  {
    icon: <Database size={40} className="text-primary" />,
    title: "Data Science Services",
    description: "Turn raw data into actionable insights with our data analysis, visualization, and predictive modeling services.",
  },
  {
    icon: <Layers size={40} className="text-primary" />,
    title: "Portfolio Builder",
    description: "Tools to help students create impressive professional portfolios that showcase their projects and skills to potential employers.",
  },
  {
    icon: <GraduationCap size={40} className="text-primary" />,
    title: "Educational Tools",
    description: "Interactive learning platforms designed to help students master complex technical concepts with hands-on practice.",
  },
  {
    icon: <Code size={40} className="text-primary" />,
    title: "Custom Development",
    description: "Tailored software solutions designed to address specific challenges faced by academic institutions and students.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a range of technology solutions focused on empowering students and educational institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 border border-border hover:border-primary card-hover"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
