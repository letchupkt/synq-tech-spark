
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Plus, Trash, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: '',
    description: '',
    image: '',
    demoUrl: '',
    githubUrl: '',
    technologies: [],
  });
  const { toast } = useToast();

  // Load projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      // Load from the default data file if not in localStorage
      import('@/data/projects.json').then((data) => {
        setProjects(data.default);
        localStorage.setItem('projects', JSON.stringify(data.default));
      });
    }
  }, []);

  // Update localStorage when projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'technologies') {
      setFormData({
        ...formData,
        technologies: value.split(',').map(tech => tech.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      demoUrl: '',
      githubUrl: '',
      technologies: [],
    });
  };

  const handleAddProject = () => {
    // Validate form data
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newProject: Project = {
      id: Date.now(), // Use timestamp as a simple id
      title: formData.title || '',
      category: formData.category || '',
      description: formData.description || '',
      image: formData.image || '/placeholder.svg',
      demoUrl: formData.demoUrl || '#',
      githubUrl: formData.githubUrl || '#',
      technologies: formData.technologies || [],
    };

    setProjects([...projects, newProject]);
    resetForm();
    setIsEditDialogOpen(false);
    
    toast({
      title: "Project added",
      description: `${newProject.title} has been added to the projects`
    });
  };

  const handleEditProject = () => {
    if (!currentProject) return;
    
    // Validate form data
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedProjects = projects.map(project => 
      project.id === currentProject.id 
        ? { 
            ...project, 
            title: formData.title || project.title,
            category: formData.category || project.category,
            description: formData.description || project.description,
            image: formData.image || project.image,
            demoUrl: formData.demoUrl || project.demoUrl,
            githubUrl: formData.githubUrl || project.githubUrl,
            technologies: formData.technologies || project.technologies,
          } 
        : project
    );

    setProjects(updatedProjects);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Project updated",
      description: `${formData.title} has been updated`
    });
  };

  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      technologies: project.technologies,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProject = () => {
    if (!currentProject) return;
    
    const filteredProjects = projects.filter(project => project.id !== currentProject.id);
    setProjects(filteredProjects);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Project removed",
      description: `${currentProject.title} has been removed from the projects`
    });
  };

  const handleAddClick = () => {
    resetForm();
    setCurrentProject(null);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Technologies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell className="hidden md:table-cell truncate max-w-sm">
                      {project.description.length > 60 ? `${project.description.substring(0, 60)}...` : project.description}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary/50 rounded-md text-xs">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-secondary/50 rounded-md text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditClick(project)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(project)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No projects found. Add your first project.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {currentProject 
                ? 'Update the project information below.' 
                : 'Fill in the details to add a new project.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="title" className="text-sm font-medium block mb-1">Title *</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Project title"
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-medium block mb-1">Category *</label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g. AI, Web, Cybersecurity"
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium block mb-1">Description *</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description about the project"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="image" className="text-sm font-medium block mb-1">Image URL</label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/project-image.jpg"
              />
            </div>
            <div>
              <label htmlFor="demoUrl" className="text-sm font-medium block mb-1">Demo URL</label>
              <Input
                id="demoUrl"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleInputChange}
                placeholder="https://demo.example.com"
              />
            </div>
            <div>
              <label htmlFor="githubUrl" className="text-sm font-medium block mb-1">GitHub URL</label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <label htmlFor="technologies" className="text-sm font-medium block mb-1">Technologies (comma separated)</label>
              <Input
                id="technologies"
                name="technologies"
                value={formData.technologies?.join(', ')}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={currentProject ? handleEditProject : handleAddProject}>
              {currentProject ? 'Save Changes' : 'Add Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {currentProject?.title} from the projects? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteProject}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
