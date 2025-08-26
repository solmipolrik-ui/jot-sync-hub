import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NotebookPen, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: NotebookPen,
      title: 'Create & Organize',
      description: 'Write, edit, and organize your notes with a beautiful, intuitive interface.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your notes are protected with secure authentication and encrypted storage.',
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Lightning-fast performance with real-time updates and seamless synchronization.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Notes App
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <NotebookPen className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Your thoughts,
              <br />
              beautifully organized
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create, organize, and manage your notes with a powerful and intuitive interface. 
              Keep your ideas safe and accessible from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
                  Start Taking Notes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you capture, organize, and find your notes effortlessly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-note-border hover:shadow-glow transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to get organized?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust Notes App to keep their thoughts organized and accessible.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">N</span>
            </div>
            <span className="text-sm text-muted-foreground">Notes App © 2024</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript, and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
