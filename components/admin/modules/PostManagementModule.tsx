import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Trash2, Eye, FileText, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Post { id: number; title: string; content: string; platform: string; status: string; createdAt: string; author: { name: string; email: string; profileImage: string }; }

const statusColor: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    APPROVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    DENIED: 'bg-red-100 text-red-700 border-red-200',
};

export const PostManagementModule = () => {
    const [posts, setPosts] = useState<Record<string, Post[]>>({ PENDING: [], APPROVED: [], DENIED: [] });
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const [pending, approved, denied] = await Promise.all([
                apiFetch<Post[]>('/api/admin/moderation/posts?status=PENDING'),
                apiFetch<Post[]>('/api/admin/moderation/posts?status=APPROVED'),
                apiFetch<Post[]>('/api/admin/moderation/posts?status=DENIED'),
            ]);
            setPosts({ PENDING: pending, APPROVED: approved, DENIED: denied });
        } catch { toast({ title: 'Error', variant: 'destructive', description: 'Failed to load posts' }); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchPosts(); }, []);

    const approve = async (postId: number) => {
        await apiFetch(`/api/admin/moderation/posts/${postId}/approve`, { method: 'POST' });
        toast({ title: 'Post approved' }); fetchPosts();
    };
    const deny = async (postId: number) => {
        await apiFetch(`/api/admin/moderation/posts/${postId}/deny`, { method: 'POST', body: JSON.stringify({ feedback: 'Does not meet guidelines' }) });
        toast({ title: 'Post denied' }); fetchPosts();
    };

    const PostCard = ({ post }: { post: Post }) => (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className={`text-xs border ${statusColor[post.status] ?? 'bg-slate-100'}`}>{post.status}</Badge>
                                <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                            </div>
                            <h3 className="font-semibold text-sm truncate">{post.title}</h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{post.content}</p>
                            <p className="text-xs text-slate-400 mt-2">By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                            {post.status === 'PENDING' && <>
                                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 gap-1 text-xs" onClick={() => approve(post.id)}><CheckCircle className="h-3.5 w-3.5" />Approve</Button>
                                <Button size="sm" variant="destructive" className="gap-1 text-xs" onClick={() => deny(post.id)}><XCircle className="h-3.5 w-3.5" />Deny</Button>
                            </>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Post Management</h2>
                <p className="text-slate-500 text-sm mt-1">Review, approve, and moderate alumni content</p>
            </div>

            {loading ? <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
                <Tabs defaultValue="PENDING">
                    <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <TabsTrigger value="PENDING" className="rounded-lg">Pending ({posts.PENDING.length})</TabsTrigger>
                        <TabsTrigger value="APPROVED" className="rounded-lg">Approved ({posts.APPROVED.length})</TabsTrigger>
                        <TabsTrigger value="DENIED" className="rounded-lg">Denied ({posts.DENIED.length})</TabsTrigger>
                    </TabsList>
                    {Object.entries(posts).map(([status, list]) => (
                        <TabsContent key={status} value={status} className="mt-4 space-y-3">
                            {list.length === 0 ? <div className="text-center py-12 text-slate-400"><FileText className="h-10 w-10 mx-auto mb-3 opacity-30" /><p>No {status.toLowerCase()} posts</p></div>
                                : list.map(p => <PostCard key={p.id} post={p} />)}
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
};
