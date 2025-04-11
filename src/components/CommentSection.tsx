
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getApprovedComments, 
  addComment, 
  incrementLikes,
  Comment as CommentType
} from '@/services/commentService';

const commentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(500)
});

type CommentFormValues = z.infer<typeof commentSchema>;

const CommentSection = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: ''
    }
  });

  // Load comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        // Fetch all comments instead of just approved ones to avoid filtering issues
        const fetchedComments = await getComments();
        // Filter approved comments on the client side if needed
        const approvedComments = fetchedComments.filter(comment => comment.is_approved === true);
        setComments(approvedComments);
        
        // Load liked comments from localStorage
        const storedLikes = localStorage.getItem('likedComments');
        if (storedLikes) {
          setLikedComments(new Set(JSON.parse(storedLikes)));
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: 'Error',
          description: 'Failed to load comments. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [toast]);

  // Handle form submission
  const onSubmit = async (data: CommentFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Ensure all required fields are explicitly assigned
      const newComment: Omit<CommentType, 'id'> = {
        name: data.name,
        email: data.email,
        comment: data.comment,
        created_at: new Date().toISOString(), // Use ISO string format for dates
        likes: 0,
        is_approved: false // New comments are pending by default
      };
      
      await addComment(newComment);
      
      form.reset();
      
      toast({
        title: 'Comment Submitted',
        description: 'Your comment has been submitted for review.',
      });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your comment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle like button click
  const handleLike = async (commentId: string) => {
    // Check if already liked
    if (likedComments.has(commentId)) {
      return;
    }
    
    try {
      // Update UI immediately
      const updatedComments = comments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      );
      setComments(updatedComments);
      
      // Add to liked set
      const newLikedComments = new Set(likedComments);
      newLikedComments.add(commentId);
      setLikedComments(newLikedComments);
      localStorage.setItem('likedComments', JSON.stringify([...newLikedComments]));
      
      // Update in Supabase
      await incrementLikes(commentId);
    } catch (error) {
      console.error('Error liking comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to like the comment. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // Add a helper function to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <section id="comments" className="section-padding bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients have to say about their experiences working with SYNQ.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Comments Display */}
          <div className="w-full lg:w-2/3">
            <h3 className="text-xl font-semibold mb-6">What People Are Saying</h3>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading comments...</span>
              </div>
            ) : comments.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No comments yet. Be the first to leave a comment!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{comment.name}</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleLike(comment.id)}
                          disabled={likedComments.has(comment.id)}
                        >
                          <Heart 
                            className={`h-4 w-4 ${likedComments.has(comment.id) ? 'fill-primary text-primary' : ''}`} 
                          />
                          <span>{comment.likes}</span>
                        </Button>
                      </div>
                      <p className="mt-3">{comment.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Comment Form */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Leave a Comment</CardTitle>
                <CardDescription>
                  Share your experience or ask a question.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comment</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your thoughts..." 
                              className="min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Submit Comment
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Import the getComments function to ensure we have access to ALL comments
import { getComments } from '@/services/commentService';

export default CommentSection;
