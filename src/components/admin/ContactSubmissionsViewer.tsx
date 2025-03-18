
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Eye, Trash2, RefreshCw, Mail } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Timestamp;
}

export const ContactSubmissionsViewer: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSubmission, setCurrentSubmission] = useState<ContactSubmission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const submissionsQuery = query(
        collection(db, 'contact_submissions'),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(submissionsQuery);
      const submissionsData: ContactSubmission[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        submissionsData.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          timestamp: data.timestamp
        });
      });
      
      setSubmissions(submissionsData);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      toast.error("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleViewSubmission = (submission: ContactSubmission) => {
    setCurrentSubmission(submission);
    setIsViewDialogOpen(true);
  };

  const handleDeleteSubmission = async (submissionId: string) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'contact_submissions', submissionId));
      setSubmissions(submissions.filter(sub => sub.id !== submissionId));
      toast.success("Submission deleted successfully");
      
      // Close dialog if open
      if (isViewDialogOpen && currentSubmission?.id === submissionId) {
        setIsViewDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast.error("Failed to delete submission");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return 'Invalid date';
    }
    return format(timestamp.toDate(), 'PPP p');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
        <Button onClick={fetchSubmissions} variant="outline" className="flex items-center gap-2">
          <RefreshCw size={16} />
          Refresh
        </Button>
      </div>

      <Card className="glass-morphism border border-white/10">
        <CardHeader>
          <CardTitle className="text-xl">Recent Submissions</CardTitle>
          <CardDescription>
            View and manage contact form submissions from your website visitors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="mx-auto mb-2 h-12 w-12 opacity-20" />
              <p>No submissions found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{submission.subject}</TableCell>
                    <TableCell>{formatDate(submission.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewSubmission(submission)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSubmission(submission.id)}
                          disabled={deleting}
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {currentSubmission && (
            <>
              <DialogHeader>
                <DialogTitle>{currentSubmission.subject}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="font-medium">From:</div>
                  <div>{currentSubmission.name}</div>
                  
                  <div className="font-medium">Email:</div>
                  <div>{currentSubmission.email}</div>
                  
                  <div className="font-medium">Date:</div>
                  <div>{formatDate(currentSubmission.timestamp)}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-sm">Message:</div>
                  <div className="bg-secondary/10 p-4 rounded-md whitespace-pre-wrap">
                    {currentSubmission.message}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between items-center sm:justify-between">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteSubmission(currentSubmission.id)}
                  disabled={deleting}
                  className="flex items-center gap-2"
                >
                  {deleting && <span className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></span>}
                  <Trash2 size={16} />
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
