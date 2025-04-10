
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, ThumbsUp, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Comment interface for type safety
interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
  likes: number;
  status?: 'approved' | 'pending' | 'rejected';
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem('synqComments');
    if (savedComments) {
      // Filter to only show approved comments
      const allComments = JSON.parse(savedComments);
      const approvedComments = allComments.filter((comment: Comment) => 
        !comment.status || comment.status === 'approved'
      );
      setComments(approvedComments);
    } else {
      // Sample comments for initial display
      const initialComments: Comment[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          comment: 'SYNQ helped us implement an AI chatbot that increased our customer engagement by 45%. Their team was professional and delivered ahead of schedule!',
          date: '2025-03-15',
          likes: 12,
          status: 'approved'
        },
        {
          id: '2',
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          comment: 'The cybersecurity audit performed by SYNQ identified critical vulnerabilities that could have cost us millions. Highly recommended for startups concerned about security.',
          date: '2025-03-28',
          likes: 8,
          status: 'approved'
        }
      ];
      setComments(initialComments);
      localStorage.setItem('synqComments', JSON.stringify(initialComments));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !newComment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to submit a comment.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new comment
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      name,
      email,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      status: 'pending' // New comments start as pending
    };
    
    // Update localStorage with all comments (including the new one)
    const savedComments = localStorage.getItem('synqComments');
    let allComments: Comment[] = [];
    
    if (savedComments) {
      allComments = JSON.parse(savedComments);
    }
    
    const updatedComments = [...allComments, newCommentObj];
    localStorage.setItem('synqComments', JSON.stringify(updatedComments));
    
    // Reset form
    setNewComment('');
    setName('');
    setEmail('');
    
    toast({
      title: "Comment submitted",
      description: "Thank you for your feedback! Your comment will be visible after approval.",
    });
  };

  // Handle like action
  const handleLike = (id: string) => {
    const savedComments = localStorage.getItem('synqComments');
    if (savedComments) {
      const allComments: Comment[] = JSON.parse(savedComments);
      
      // Update the liked comment
      const updatedAllComments = allComments.map(comment => 
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      );
      
      // Save back to localStorage
      localStorage.setItem('synqComments', JSON.stringify(updatedAllComments));
      
      // Update visible comments
      const visibleComments = updatedAllComments.filter(
        comment => !comment.status || comment.status === 'approved'
      );
      setComments(visibleComments);
    }
  };

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <h2 className="section-title text-center mb-12">Client Testimonials</h2>
        
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Card className="bg-card/80 backdrop-blur border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Client Reviews
                </CardTitle>
              </CardHeader>
              <ScrollArea className="h-[450px] pr-4">
                <CardContent className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <Card key={comment.id} className="bg-muted/40 mb-4 card-hover">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{comment.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" /> {comment.date}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="flex items-center gap-1 text-xs"
                              onClick={() => handleLike(comment.id)}
                            >
                              <ThumbsUp className="h-3 w-3" /> {comment.likes}
                            </Button>
                          </div>
                          <p className="text-sm mt-2">{comment.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No comments yet. Be the first to share your experience!</p>
                    </div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
          
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Card className="bg-card/80 backdrop-blur border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Share Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-1">Your Experience</label>
                    <Textarea
                      id="comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience with SYNQ..."
                      className="bg-background/50 min-h-[120px]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full button-primary">
                    Submit Feedback
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground text-center">
                Your feedback helps us improve and helps others learn about our services.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
