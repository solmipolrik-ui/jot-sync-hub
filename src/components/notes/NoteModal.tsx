import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Note } from '@/services/api';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  content: z.string().min(1, 'Content is required').max(5000, 'Content too long'),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => Promise<void>;
  note?: Note | null;
  isLoading?: boolean;
}

export const NoteModal = ({ isOpen, onClose, onSave, note, isLoading }: NoteModalProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (note) {
      form.setValue('title', note.title);
      form.setValue('content', note.content);
    } else {
      form.reset({ title: '', content: '' });
    }
  }, [note, form]);

  const onSubmit = async (data: NoteFormData) => {
    setIsSaving(true);
    try {
      await onSave(data.title, data.content);
      form.reset();
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {note ? 'Edit Note' : 'Create New Note'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter note title..."
                      className="bg-input border-border focus:ring-ring"
                      disabled={isSaving || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write your note content here..."
                      className="min-h-[200px] bg-input border-border focus:ring-ring resize-none"
                      disabled={isSaving || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSaving || isLoading}
                className="border-border hover:bg-muted"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving || isLoading}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};