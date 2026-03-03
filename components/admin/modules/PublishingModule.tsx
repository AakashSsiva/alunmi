import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, CheckCircle2, AlertCircle, XCircle, Facebook, Instagram, Linkedin, Youtube, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type Platform = 'facebook' | 'instagram' | 'linkedin' | 'youtube';

interface SocialStatus {
    facebook: boolean;
    instagram: boolean;
    linkedin: boolean;
    youtube: boolean;
}

export const PublishingModule = () => {
    const { token } = useAuth();
    const [status, setStatus] = useState<SocialStatus>({
        facebook: false, instagram: false, linkedin: false, youtube: false
    });
    const [loadingStatus, setLoadingStatus] = useState(true);

    // Form state
    const [caption, setCaption] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        setLoadingStatus(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/social/status`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStatus(data);
                // Pre-select configured platforms
                const active = Object.keys(data).filter(k => data[k as Platform]) as Platform[];
                setSelectedPlatforms(active);
            }
        } catch (error) {
            console.error('Failed to fetch social status', error);
        } finally {
            setLoadingStatus(false);
        }
    };

    const togglePlatform = (p: Platform) => {
        if (!status[p]) {
            toast.error(`Platform ${p} is not configured yet.`);
            return;
        }
        setSelectedPlatforms(prev =>
            prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
        );
    };

    const handlePublish = async () => {
        if (!caption.trim()) return toast.error('Caption is required.');
        if (selectedPlatforms.length === 0) return toast.error('Select at least one platform.');
        if (selectedPlatforms.includes('instagram') && !imageUrl) {
            return toast.error('Instagram requires an image URL.');
        }

        setIsPublishing(true);
        try {
            const payload = {
                caption: caption.trim(),
                imageUrl: imageUrl.trim() || undefined,
                link: linkUrl.trim() || undefined,
                platforms: selectedPlatforms
            };

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/social/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Successfully published to selected platforms!');
                setCaption('');
                setImageUrl('');
                setLinkUrl('');
            } else {
                toast.error(data.error || 'Failed to publish post');
            }
        } catch (error) {
            console.error(error);
            toast.error('A network error occurred');
        } finally {
            setIsPublishing(false);
        }
    };

    const platforms = [
        { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
        { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50' },
        { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Publishing & Social Media</h2>
                <p className="text-slate-500 text-sm mt-1">Cross-post content to Facebook, Instagram, LinkedIn, and YouTube instantly.</p>
            </div>

            {/* Platform Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map(p => {
                    const isConfigured = status[p.id as Platform];
                    return (
                        <Card key={p.id} className="border-0 shadow-sm">
                            <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center relative overflow-hidden">
                                {loadingStatus ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"><Loader2 className="animate-spin h-5 w-5 text-slate-400" /></div>
                                ) : null}
                                <div className={`p-3 rounded-xl ${p.bg}`}>
                                    <p.icon className={`h-6 w-6 ${p.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{p.label}</p>
                                    <Badge variant="secondary" className={`mt-1 text-[10px] ${isConfigured ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {isConfigured ? 'Connected' : 'Not Configured'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Compose Area */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Card className="border border-slate-200/60 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Compose Post</CardTitle>
                            <CardDescription>Write your content and attach media to publish across platforms.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex justify-between">
                                    <span>Caption</span>
                                    <span className="text-xs text-slate-400">{caption.length} chars</span>
                                </label>
                                <Textarea
                                    placeholder="What's happening in the alumni network?"
                                    className="min-h-[140px] resize-none"
                                    value={caption}
                                    onChange={e => setCaption(e.target.value)}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-slate-400" /> Image URL
                                    </label>
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={imageUrl}
                                        onChange={e => setImageUrl(e.target.value)}
                                    />
                                    <p className="text-[10px] text-slate-500">Required for Instagram.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <LinkIcon className="h-4 w-4 text-slate-400" /> Link URL
                                    </label>
                                    <Input
                                        placeholder="https://adhiyamaan-connects.app"
                                        value={linkUrl}
                                        onChange={e => setLinkUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <Card className="border border-slate-200/60 shadow-sm sticky top-6">
                        <CardHeader className="pb-4 border-b border-slate-100 mb-4">
                            <CardTitle className="text-lg">Publish To</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                {platforms.map(p => {
                                    const isConfigured = status[p.id as Platform];
                                    const isSelected = selectedPlatforms.includes(p.id as Platform);

                                    return (
                                        <div
                                            key={p.id}
                                            onClick={() => isConfigured && togglePlatform(p.id as Platform)}
                                            className={`
                                                flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
                                                ${!isConfigured ? 'opacity-50 bg-slate-50 border-slate-100 cursor-not-allowed' :
                                                    isSelected ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 hover:border-indigo-300'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <p.icon className={`h-5 w-5 ${isSelected ? p.color : 'text-slate-400'}`} />
                                                <span className={`font-medium text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-600'}`}>
                                                    {p.label}
                                                </span>
                                            </div>
                                            {isSelected && <CheckCircle2 className="h-5 w-5 text-indigo-500" />}
                                        </div>
                                    );
                                })}
                            </div>

                            <Button
                                className="w-full gap-2 h-11 bg-indigo-600 hover:bg-indigo-700"
                                size="lg"
                                onClick={handlePublish}
                                disabled={isPublishing || selectedPlatforms.length === 0 || !caption.trim()}
                            >
                                {isPublishing ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Send className="h-5 w-5" />
                                )}
                                {isPublishing ? 'Publishing...' : `Publish to ${selectedPlatforms.length} platform${selectedPlatforms.length === 1 ? '' : 's'}`}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
