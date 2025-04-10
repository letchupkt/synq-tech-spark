
import { ArrowUpRight, CircleDashed, Lightbulb, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="section-title">About SYNQ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to empower students through technology and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-6">Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              SYNQ is dedicated to bridging the technology gap faced by students by creating accessible,
              innovative solutions that empower the next generation of tech leaders. We believe that students
              have the potential to drive technological innovation, and we're here to provide the tools and
              support they need to succeed.
            </p>
            <p className="text-muted-foreground">
              Founded by students, for students, SYNQ understands the unique challenges faced by young
              technologists and aims to create practical solutions that address real-world problems while
              building a community of like-minded innovators.
            </p>
            <div className="mt-8 flex flex-col space-y-6">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Innovation Focus</h4>
                  <p className="text-muted-foreground">Creating cutting-edge solutions that push boundaries.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Community Driven</h4>
                  <p className="text-muted-foreground">Building a network of student innovators and creators.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/10 mr-4">
                  <CircleDashed className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Continuous Learning</h4>
                  <p className="text-muted-foreground">Embracing growth and adaptation in the fast-evolving tech landscape.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-card rounded-lg p-8 relative z-10">
              <h3 className="text-xl font-semibold font-poppins mb-4">Tech Focus Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-5 transition-all hover:border-primary card-hover">
                  <h4 className="font-medium mb-2">Artificial Intelligence</h4>
                  <p className="text-sm text-muted-foreground">Developing AI solutions that solve real-world problems.</p>
                  <a href="#services" className="mt-3 inline-flex items-center text-primary text-sm">
                    Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div className="border border-border rounded-lg p-5 transition-all hover:border-primary card-hover">
                  <h4 className="font-medium mb-2">Data Science</h4>
                  <p className="text-sm text-muted-foreground">Transforming data into meaningful insights and applications.</p>
                  <a href="#services" className="mt-3 inline-flex items-center text-primary text-sm">
                    Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div className="border border-border rounded-lg p-5 transition-all hover:border-primary card-hover">
                  <h4 className="font-medium mb-2">Cybersecurity</h4>
                  <p className="text-sm text-muted-foreground">Building secure systems and raising security awareness.</p>
                  <a href="#services" className="mt-3 inline-flex items-center text-primary text-sm">
                    Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div className="border border-border rounded-lg p-5 transition-all hover:border-primary card-hover">
                  <h4 className="font-medium mb-2">Educational Tech</h4>
                  <p className="text-sm text-muted-foreground">Creating tools that enhance the learning experience.</p>
                  <a href="#services" className="mt-3 inline-flex items-center text-primary text-sm">
                    Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute top-4 left-4 w-full h-full bg-primary/5 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
