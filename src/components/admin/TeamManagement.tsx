
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
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Pencil, Plus, Trash, Github, Linkedin, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    bio: '',
    photo: '',
    social: {
      linkedin: '',
      github: '',
      instagram: '',
    }
  });
  const { toast } = useToast();

  // Load team members from localStorage on component mount
  useEffect(() => {
    const storedTeam = localStorage.getItem('teamMembers');
    if (storedTeam) {
      setTeamMembers(JSON.parse(storedTeam));
    } else {
      // Load from the default data file if not in localStorage
      import('@/data/team.json').then((data) => {
        setTeamMembers(data.default);
        localStorage.setItem('teamMembers', JSON.stringify(data.default));
      });
    }
  }, []);

  // Update localStorage when team members change
  useEffect(() => {
    if (teamMembers.length > 0) {
      localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    }
  }, [teamMembers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData({
        ...formData,
        social: {
          ...formData.social,
          [socialField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      photo: '',
      social: {
        linkedin: '',
        github: '',
        instagram: '',
      }
    });
  };

  const handleAddMember = () => {
    // Validate form data
    if (!formData.name || !formData.role || !formData.bio) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now(), // Use timestamp as a simple id
      name: formData.name || '',
      role: formData.role || '',
      bio: formData.bio || '',
      photo: formData.photo || '/placeholder.svg',
      social: {
        linkedin: formData.social?.linkedin || '',
        github: formData.social?.github || '',
        instagram: formData.social?.instagram || '',
      }
    };

    setTeamMembers([...teamMembers, newMember]);
    resetForm();
    setIsEditDialogOpen(false);
    
    toast({
      title: "Team member added",
      description: `${newMember.name} has been added to the team`
    });
  };

  const handleEditMember = () => {
    if (!currentMember) return;
    
    // Validate form data
    if (!formData.name || !formData.role || !formData.bio) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedMembers = teamMembers.map(member => 
      member.id === currentMember.id 
        ? { 
            ...member, 
            name: formData.name || member.name,
            role: formData.role || member.role,
            bio: formData.bio || member.bio,
            photo: formData.photo || member.photo,
            social: {
              linkedin: formData.social?.linkedin || member.social.linkedin || '',
              github: formData.social?.github || member.social.github || '',
              instagram: formData.social?.instagram || member.social.instagram || '',
            }
          } 
        : member
    );

    setTeamMembers(updatedMembers);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Team member updated",
      description: `${formData.name}'s information has been updated`
    });
  };

  const handleEditClick = (member: TeamMember) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo: member.photo,
      social: {
        linkedin: member.social.linkedin || '',
        github: member.social.github || '',
        instagram: member.social.instagram || '',
      }
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (member: TeamMember) => {
    setCurrentMember(member);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteMember = () => {
    if (!currentMember) return;
    
    const filteredMembers = teamMembers.filter(member => member.id !== currentMember.id);
    setTeamMembers(filteredMembers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Team member removed",
      description: `${currentMember.name} has been removed from the team`
    });
  };

  const handleAddClick = () => {
    resetForm();
    setCurrentMember(null);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Team Members</CardTitle>
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Bio</TableHead>
                <TableHead className="hidden md:table-cell">Social</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="hidden md:table-cell truncate max-w-sm">
                      {member.bio.length > 60 ? `${member.bio.substring(0, 60)}...` : member.bio}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex space-x-2">
                        {member.social.linkedin && <Linkedin size={16} />}
                        {member.social.github && <Github size={16} />}
                        {member.social.instagram && <Instagram size={16} />}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditClick(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(member)}
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
                    No team members found. Add your first team member.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
            <DialogDescription>
              {currentMember 
                ? 'Update the team member information below.' 
                : 'Fill in the details to add a new team member.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-1">Name *</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Team member name"
              />
            </div>
            <div>
              <label htmlFor="role" className="text-sm font-medium block mb-1">Role *</label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-medium block mb-1">Bio *</label>
              <Input
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief description about the team member"
              />
            </div>
            <div>
              <label htmlFor="photo" className="text-sm font-medium block mb-1">Photo URL</label>
              <Input
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
                placeholder="/team-member.jpg"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="text-sm font-medium block mb-1">LinkedIn URL</label>
              <Input
                id="linkedin"
                name="social.linkedin"
                value={formData.social?.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label htmlFor="github" className="text-sm font-medium block mb-1">GitHub URL</label>
              <Input
                id="github"
                name="social.github"
                value={formData.social?.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="text-sm font-medium block mb-1">Instagram URL</label>
              <Input
                id="instagram"
                name="social.instagram"
                value={formData.social?.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={currentMember ? handleEditMember : handleAddMember}>
              {currentMember ? 'Save Changes' : 'Add Member'}
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
              Are you sure you want to remove {currentMember?.name} from the team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteMember}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamManagement;
