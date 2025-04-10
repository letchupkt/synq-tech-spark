
import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import projectsData from '@/data/projects.json';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // In a real app, this would be a fetch request to an API
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    
    if (category === 'All') {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => project.category === category);
    setFilteredProjects(filtered);
  };

  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative projects across different technology domains.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                ${activeFilter === category 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-card rounded-lg overflow-hidden border border-border card-hover">
              <div className="h-48 bg-secondary/50 relative">
                {/* We would use actual images in a real project */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/40">
                  <span className="text-lg font-medium">{project.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-secondary/50 rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="mr-1 h-4 w-4" /> Demo
                  </a>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    <Github className="mr-1 h-4 w-4" /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
