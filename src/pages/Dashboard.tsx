import { useState, useEffect } from 'react';
import { Search, FileText, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/dashboard/Header';
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteModal } from '@/components/notes/NoteModal';
import { apiService, Note } from '@/services/api';

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [notes, searchQuery]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await apiService.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch notes',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await apiService.deleteNote(noteId);
      setNotes(notes.filter(note => note._id !== noteId));
      toast({
        title: 'Note deleted',
        description: 'The note has been successfully deleted.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete note',
      });
    }
  };

  const handleSaveNote = async (title: string, content: string) => {
    try {
      if (editingNote) {
        const updatedNote = await apiService.updateNote(editingNote._id, title, content);
        setNotes(notes.map(note => note._id === editingNote._id ? updatedNote : note));
        toast({
          title: 'Note updated',
          description: 'Your note has been successfully updated.',
        });
      } else {
        const newNote = await apiService.createNote(title, content);
        setNotes([newNote, ...notes]);
        toast({
          title: 'Note created',
          description: 'Your new note has been successfully created.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: editingNote ? 'Failed to update note' : 'Failed to create note',
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCreateNote={handleCreateNote} />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading your notes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateNote={handleCreateNote} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border focus:ring-ring"
            />
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
              <p className="text-muted-foreground">
                No notes match your search for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first note to get started organizing your thoughts.
              </p>
              <Button
                onClick={handleCreateNote}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Note
              </Button>
            </div>
          )}
        </div>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  );
};

export default Dashboard;