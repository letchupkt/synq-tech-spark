
import { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { getTeamMembers, TeamMember } from '@/services/teamService';

const TeamSection = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const members = await getTeamMembers();
        setTeam(members);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
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

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading team members...</span>
          </div>
        ) : error ? (
          <div className="text-center text-destructive p-8">
            <p>{error}</p>
          </div>
        ) : (
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
                    {member.social_links?.linkedin && (
                      <a 
                        href={member.social_links.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {member.social_links?.github && (
                      <a 
                        href={member.social_links.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-full bg-secondary hover:bg-primary transition-colors duration-300"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {member.social_links?.instagram && (
                      <a 
                        href={member.social_links.instagram} 
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
        )}
      </div>
    </section>
  );
};

export default TeamSection;
