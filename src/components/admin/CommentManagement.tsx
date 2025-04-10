
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
import { Pencil, Trash, ThumbsUp, Calendar, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
  likes: number;
  status?: 'approved' | 'pending' | 'rejected';
}

const CommentManagement = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);
  const { toast } = useToast();

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('synqComments');
    if (storedComments) {
      // Add status field if not present
      const parsedComments = JSON.parse(storedComments).map((comment: Comment) => ({
        ...comment,
        status: comment.status || 'approved' // Default to approved for existing comments
      }));
      setComments(parsedComments);
      // Store back with the status field
      localStorage.setItem('synqComments', JSON.stringify(parsedComments));
    } else {
      // If no comments found, set empty array
      setComments([]);
    }
  }, []);

  // Update localStorage when comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('synqComments', JSON.stringify(comments));
    }
  }, [comments]);

  const handleViewClick = (comment: Comment) => {
    setCurrentComment(comment);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (comment: Comment) => {
    setCurrentComment(comment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteComment = () => {
    if (!currentComment) return;
    
    const filteredComments = comments.filter(comment => comment.id !== currentComment.id);
    setComments(filteredComments);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Comment deleted",
      description: `The comment from ${currentComment.name} has been deleted`
    });
  };

  const handleStatusChange = (commentId: string, status: 'approved' | 'pending' | 'rejected') => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, status }
        : comment
    );
    
    setComments(updatedComments);
    
    toast({
      title: `Comment ${status}`,
      description: `The comment has been marked as ${status}`
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-green-500">Approved</Badge>;
    }
  };

  // Get filtered comments that should show on the website
  const getPublicComments = () => {
    return comments.filter(comment => comment.status === 'approved');
  };

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
                    <TableCell>{comment.date}</TableCell>
                    <TableCell className="hidden md:table-cell truncate max-w-sm">
                      {comment.comment.length > 60 ? `${comment.comment.substring(0, 60)}...` : comment.comment}
                    </TableCell>
                    <TableCell>{getStatusBadge(comment.status)}</TableCell>
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
                    <Calendar className="h-3 w-3" /> {currentComment.date}
                    <span className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" /> {currentComment.likes}
                    </span>
                  </div>
                </div>
                {getStatusBadge(currentComment.status)}
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p>{currentComment.comment}</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <h4 className="text-sm font-semibold">Set Comment Status:</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={currentComment.status === 'approved' ? 'default' : 'outline'} 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange(currentComment.id, 'approved')}
                  >
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                  <Button 
                    variant={currentComment.status === 'pending' ? 'default' : 'outline'} 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange(currentComment.id, 'pending')}
                  >
                    <span className="h-2 w-2 bg-yellow-500 rounded-full mr-1" /> Pending
                  </Button>
                  <Button 
                    variant={currentComment.status === 'rejected' ? 'default' : 'outline'} 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleStatusChange(currentComment.id, 'rejected')}
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
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteComment}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentManagement;
