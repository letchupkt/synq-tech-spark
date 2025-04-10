
import { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import teamData from '@/data/team.json';

type TeamMember = {
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
};

const TeamSection = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    // In a real app, this would be a fetch request to an API
    setTeam(teamData);
  }, []);

  return (
    <section id="team" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate individuals behind SYNQ who are driving innovation and empowering students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-card rounded-lg overflow-hidden border border-border card-hover">
              <div className="h-64 bg-secondary/50 relative">
                {/* We would use actual images in a real project */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/40">
                  <span className="text-lg font-medium">{member.name}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a 
                      href={member.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
