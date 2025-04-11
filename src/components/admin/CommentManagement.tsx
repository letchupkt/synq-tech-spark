
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash, ThumbsUp, Calendar, Check, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getComments, 
  updateComment, 
  deleteComment,
  Comment
} from '@/services/commentService';

const CommentManagement = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);
  const { toast } = useToast();

  // Load comments from Supabase
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const fetchedComments = await getComments();
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: "Error",
          description: "Failed to load comments. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [toast]);

  const handleViewClick = (comment: Comment) => {
    setCurrentComment(comment);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (comment: Comment) => {
    setCurrentComment(comment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteComment = async () => {
    if (!currentComment) return;
    
    try {
      setIsSubmitting(true);
      await deleteComment(currentComment.id);
      
      const filteredComments = comments.filter(comment => comment.id !== currentComment.id);
      setComments(filteredComments);
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "Comment deleted",
        description: `The comment from ${currentComment.name} has been deleted`
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (commentId: string, status: boolean) => {
    try {
      setIsSubmitting(true);
      await updateComment(commentId, { is_approved: status });
      
      const updatedComments = comments.map(comment =>
        comment.id === commentId
          ? { ...comment, is_approved: status }
          : comment
      );
      
      setComments(updatedComments);
      
      toast({
        title: `Comment ${status ? 'approved' : 'rejected'}`,
        description: `The comment has been marked as ${status ? 'approved' : 'rejected'}`
      });
    } catch (error) {
      console.error('Error updating comment status:', error);
      toast({
        title: "Error",
        description: "Failed to update comment status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (isApproved?: boolean) => {
    if (isApproved === true) {
      return <Badge className="bg-green-500">Approved</Badge>;
    } else if (isApproved === false) {
      return <Badge className="bg-red-500">Rejected</Badge>;
    } else {
      return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  // Get filtered comments that should show on the website
  const getPublicComments = () => {
    return comments.filter(comment => comment.is_approved === true);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading comments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Client Comments</CardTitle>
          <Badge variant="outline" className="ml-2">
            {getPublicComments().length}/{comments.length} Visible
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden md:table-cell">Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">{comment.name}</TableCell>
                    <TableCell>{formatDate(comment.created_at)}</TableCell>
                    <TableCell className="hidden md:table-cell truncate max-w-sm">
                      {comment.comment.length > 60 ? `${comment.comment.substring(0, 60)}...` : comment.comment}
                    </TableCell>
                    <TableCell>{getStatusBadge(comment.is_approved)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewClick(comment)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(comment)}
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
                    No comments found. Comments will appear here when clients submit feedback.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View/Edit Comment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Comment Details</DialogTitle>
            <DialogDescription>
              Review and manage this comment.
            </DialogDescription>
          </DialogHeader>
          
          {currentComment && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{currentComment.name}</h4>
                  <p className="text-sm text-muted-foreground">{currentComment.email}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" /> {formatDate(currentComment.created_at)}
                    <span className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" /> {currentComment.likes}
                    </span>
                  </div>
                </div>
                {getStatusBadge(currentComment.is_approved)}
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p>{currentComment.comment}</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <h4 className="text-sm font-semibold">Set Comment Status:</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={currentComment.is_approved === true ? 'default' : 'outline'} 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange(currentComment.id, true)}
                    disabled={isSubmitting}
                  >
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                  <Button 
                    variant={currentComment.is_approved === false ? 'default' : 'outline'} 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange(currentComment.id, false)}
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment from {currentComment?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteComment}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentManagement;
