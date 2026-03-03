import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Newspaper, Plus, Star, Check } from 'lucide-react';
import { type NewsItem } from '@/lib/mockData';
import { apiFetch } from '@/lib/utils';
import { toast } from 'sonner';

const News = () => {
  const { user, isAuthenticated } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [readNews, setReadNews] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const data = await apiFetch<Array<{ id: number; title: string; summary: string; url: string; publishedAt: string }>>('/api/news');
      setNews(
        data.map(n => ({
          id: String(n.id),
          title: n.title,
          content: n.summary,
          category: 'general',
          author: 'Admin',
          publishedDate: n.publishedAt.split('T')[0],
          featured: false,
        }))
      );
    })();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMarkAsRead = (newsId: string) => {
    setReadNews(prev => new Set([...prev, newsId]));
    toast.success('Marked as read');
  };

  const handlePostNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('Please login to post news.');
      return;
    }

    try {
      const created = await apiFetch<{ id: number; title: string; summary: string; url?: string; publishedAt: string }>(
        '/api/news',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            title: formData.get('title'),
            summary: formData.get('content'),
            url: 'https://example.com/news',
          })
        }
      );
      const mapped: NewsItem = {
        id: String(created.id),
        title: created.title,
        content: created.summary,
        category: 'general',
        author: user?.name || 'Admin',
        publishedDate: created.publishedAt.split('T')[0],
        featured: formData.get('featured') === 'on',
      };
      setNews([mapped, ...news]);
      setDialogOpen(false);
      toast.success('News article published successfully!');
    } catch (err) {
      toast.error('Failed to publish news');
    }
  };

  const Layout = isAuthenticated ? DashboardLayout : 'div';

  const categoryColors = {
    achievement: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    announcement: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    spotlight: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">News & Announcements</h1>
            <p className="text-muted-foreground">Stay updated with the latest from ACE</p>
          </div>
          {user?.role === 'admin' && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Post News
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Publish News Article</DialogTitle>
                  <DialogDescription>
                    Share news and announcements with the alumni community
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePostNews}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Article Title *</Label>
                      <Input id="title" name="title" placeholder="Enter news title..." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="achievement">Achievement</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="spotlight">Alumni Spotlight</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Write your article content..."
                        rows={8}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="featured" className="cursor-pointer">
                        Feature this article on homepage
                      </Label>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="submit">Publish Article</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Featured News */}
        {news.filter(item => item.featured).length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Star className="h-5 w-5 text-accent fill-accent" />
              Featured Stories
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {news
                .filter(item => item.featured)
                .slice(0, 2)
                .map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-all border-accent/20">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={categoryColors[item.category]}>
                          {item.category}
                        </Badge>
                        <Star className="h-4 w-4 text-accent fill-accent" />
                      </div>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                      <CardDescription>
                        By {item.author} • {new Date(item.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.content}</p>
                      {isAuthenticated && !readNews.has(item.id) && (
                        <div className="mt-4 pt-4 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(item.id)}
                            className="w-full"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Mark as Read
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All News */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All News</h2>
          <div className="space-y-4">
            {news.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">No news articles available</p>
                </CardContent>
              </Card>
            ) : (
              news.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={categoryColors[item.category]}>
                            {item.category}
                          </Badge>
                          {item.featured && (
                            <Star className="h-4 w-4 text-accent fill-accent" />
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                        <CardDescription>
                          By {item.author} • {new Date(item.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                    {isAuthenticated && !readNews.has(item.id) && (
                      <div className="mt-4 pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(item.id)}
                          className="w-full"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
