
import { 
  BrainCircuit, 
  Shield, 
  Database, 
  Layers, 
  GraduationCap, 
  Code,
  Globe,
  Smartphone,
  PenTool,
  LayoutDashboard,
  Bot,
  LineChart,
  Cpu,
  Cloud,
  Bitcoin,
  ShieldAlert,
  Terminal,
  Lock,
  Users,
  Search,
  BarChart3,
  Sparkles,
  Mail,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  Lightbulb,
  Briefcase,
  Rocket,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const serviceCategories = [
  {
    id: "development",
    name: "Development Services",
    services: [
      {
        icon: <Globe size={40} className="text-primary" />,
        title: "Web Development",
        description: "Full-stack solutions including frontend, backend, and database integration for responsive web applications.",
      },
      {
        icon: <Smartphone size={40} className="text-primary" />,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for Android and iOS platforms.",
      },
      {
        icon: <Code size={40} className="text-primary" />,
        title: "Custom Software & API Solutions",
        description: "Bespoke software development and API integrations tailored to your specific business needs.",
      },
      {
        icon: <PenTool size={40} className="text-primary" />,
        title: "UI/UX Design",
        description: "User-centered design services creating intuitive, engaging digital experiences.",
      },
      {
        icon: <LayoutDashboard size={40} className="text-primary" />,
        title: "Admin Dashboards",
        description: "Custom administrative interfaces with real-time analytics and user management capabilities.",
      },
    ]
  },
  {
    id: "ai-data",
    name: "AI, Data & Emerging Tech",
    services: [
      {
        icon: <Bot size={40} className="text-primary" />,
        title: "AI Chatbots & Automation",
        description: "Intelligent conversational agents and process automation to streamline operations.",
      },
      {
        icon: <LineChart size={40} className="text-primary" />,
        title: "Data Analytics & Prediction Models",
        description: "Data processing pipelines and predictive modeling for actionable business insights.",
      },
      {
        icon: <Cpu size={40} className="text-primary" />,
        title: "IoT System Integration",
        description: "Connected device ecosystems with real-time monitoring and control capabilities.",
      },
      {
        icon: <Cloud size={40} className="text-primary" />,
        title: "Cloud Architecture & DevOps",
        description: "Scalable cloud infrastructure design and continuous integration/deployment pipelines.",
      },
      {
        icon: <Bitcoin size={40} className="text-primary" />,
        title: "Blockchain & Web3 Development",
        description: "Decentralized applications, smart contracts, and blockchain integration services.",
      },
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Services",
    services: [
      {
        icon: <ShieldAlert size={40} className="text-primary" />,
        title: "Vulnerability Assessments",
        description: "Comprehensive security testing to identify and remediate potential vulnerabilities.",
      },
      {
        icon: <Terminal size={40} className="text-primary" />,
        title: "Ethical Hacking & Security Audits",
        description: "Controlled penetration testing and thorough security audits of your systems.",
      },
      {
        icon: <Lock size={40} className="text-primary" />,
        title: "SOC Design & Incident Monitoring",
        description: "Security operations center design and real-time threat monitoring solutions.",
      },
      {
        icon: <Users size={40} className="text-primary" />,
        title: "Cybersecurity Awareness Programs",
        description: "Educational programs to train personnel in security best practices and threat recognition.",
      },
    ]
  },
  {
    id: "digital-growth",
    name: "Digital Growth & SEO",
    services: [
      {
        icon: <Search size={40} className="text-primary" />,
        title: "Search Engine Optimization",
        description: "Strategic SEO services to improve visibility and organic traffic to your digital platforms.",
      },
      {
        icon: <BarChart3 size={40} className="text-primary" />,
        title: "Performance Marketing",
        description: "Data-driven advertising campaigns across Google, Meta, and other digital platforms.",
      },
      {
        icon: <Sparkles size={40} className="text-primary" />,
        title: "Brand Building & Social Media",
        description: "Brand identity development and strategic social media presence management.",
      },
      {
        icon: <Mail size={40} className="text-primary" />,
        title: "Content Marketing & Emails",
        description: "Engaging content creation and targeted email marketing campaigns.",
      },
    ]
  },
  {
    id: "ecommerce",
    name: "E-Commerce Development",
    services: [
      {
        icon: <ShoppingCart size={40} className="text-primary" />,
        title: "E-Commerce Website Development",
        description: "Custom online store development with seamless user experience and secure checkout.",
      },
      {
        icon: <Layers size={40} className="text-primary" />,
        title: "Platform Integration",
        description: "Shopify, WooCommerce, and headless commerce implementation and customization.",
      },
      {
        icon: <CreditCard size={40} className="text-primary" />,
        title: "Payment & CRM Integration",
        description: "Secure payment processing and customer relationship management system integration.",
      },
      {
        icon: <TrendingUp size={40} className="text-primary" />,
        title: "Store Optimization & Scaling",
        description: "Performance optimization, SEO, and conversion rate improvement strategies.",
      },
    ]
  },
  {
    id: "learning",
    name: "Learning & Internship Programs",
    services: [
      {
        icon: <GraduationCap size={40} className="text-primary" />,
        title: "Tech Workshops & Bootcamps",
        description: "Intensive hands-on learning experiences in various technology domains.",
      },
      {
        icon: <Briefcase size={40} className="text-primary" />,
        title: "Internship Programs",
        description: "Structured internship opportunities with industry-recognized certification.",
      },
      {
        icon: <Rocket size={40} className="text-primary" />,
        title: "Real-time Projects & Mentorship",
        description: "Practical experience through real-world projects with expert guidance.",
      },
      {
        icon: <Users size={40} className="text-primary" />,
        title: "Campus Collaboration",
        description: "Educational partnerships to enhance technical skills among student communities.",
      },
    ]
  },
  {
    id: "consulting",
    name: "Tech Consulting",
    services: [
      {
        icon: <Lightbulb size={40} className="text-primary" />,
        title: "Startup Tech Stack Guidance",
        description: "Expert advice on selecting the optimal technology stack for your startup.",
      },
      {
        icon: <Rocket size={40} className="text-primary" />,
        title: "MVP Building & Digital Strategy",
        description: "Rapid development of minimum viable products and comprehensive digital strategies.",
      },
      {
        icon: <Zap size={40} className="text-primary" />,
        title: "Performance Optimization",
        description: "Technical assessment and optimization of existing systems for improved performance.",
      },
    ]
  },
];

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState("development");
  
  const activeServices = serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <section id="services" className="section-padding py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We offer a comprehensive range of technology solutions focused on empowering students, businesses, and educational institutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {serviceCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-full text-sm",
                  activeCategory === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10 hover:text-primary"
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {activeServices.map((service, index) => (
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
