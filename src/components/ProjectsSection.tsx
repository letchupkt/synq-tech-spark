
import { useState, useEffect } from 'react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { getProjects, Project } from '@/services/projectService';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
        
        // Extract unique categories (using type instead of category)
        const uniqueCategories = ['All', ...Array.from(new Set(fetchedProjects.map(project => project.type)))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    
    if (category === 'All') {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => project.type === category);
    setFilteredProjects(filtered);
  };

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative projects across different technology domains.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading projects...</span>
          </div>
        ) : error ? (
          <div className="text-center text-destructive p-8">
            <p>{error}</p>
          </div>
        ) : (
          <>
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
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/40">
                      <span className="text-lg font-medium">{project.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack && project.tech_stack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-secondary/50 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      {project.demo_url && (
                        <a 
                          href={project.demo_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="mr-1 h-4 w-4" /> Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <Github className="mr-1 h-4 w-4" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
