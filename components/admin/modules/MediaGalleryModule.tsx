import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image, Trash2, CheckCircle, FolderOpen, Upload, Film } from 'lucide-react';

const mockMedia = [
    { id: 1, type: 'IMAGE', name: 'alumni_photo_2024.jpg', size: '2.4 MB', status: 'APPROVED', uploader: 'Priya Sharma' },
    { id: 2, type: 'VIDEO', name: 'graduation_ceremony.mp4', size: '45 MB', status: 'PENDING', uploader: 'Rahul Kumar' },
    { id: 3, type: 'IMAGE', name: 'campus_event.jpg', size: '1.8 MB', status: 'APPROVED', uploader: 'Ananya Singh' },
    { id: 4, type: 'IMAGE', name: 'sports_day_2024.jpg', size: '3.1 MB', status: 'PENDING', uploader: 'Vikram Nair' },
    { id: 5, type: 'VIDEO', name: 'alumni_talk.mp4', size: '120 MB', status: 'APPROVED', uploader: 'Deepa Menon' },
];

const statusColor: Record<string, string> = {
    APPROVED: 'bg-emerald-100 text-emerald-700',
    PENDING: 'bg-amber-100 text-amber-700',
    REJECTED: 'bg-red-100 text-red-700',
};

export const MediaGalleryModule = () => (
    <div className="space-y-6">
        <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Media & Gallery Management</h2>
            <p className="text-slate-500 text-sm mt-1">Manage uploaded media files and the alumni gallery</p></div>

        <div className="grid grid-cols-3 gap-4">
            {[{ label: 'Total Files', value: mockMedia.length, color: 'text-blue-600', icon: FolderOpen },
            { label: 'Approved', value: mockMedia.filter(m => m.status === 'APPROVED').length, color: 'text-emerald-600', icon: CheckCircle },
            { label: 'Pending Review', value: mockMedia.filter(m => m.status === 'PENDING').length, color: 'text-amber-600', icon: Upload }].map(s => (
                <Card key={s.label} className="border-0 shadow-sm"><CardContent className="p-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-slate-100 ${s.color}`}><s.icon className="h-4 w-4" /></div>
                    <div><p className="text-xs text-slate-500">{s.label}</p><p className={`text-xl font-bold ${s.color}`}>{s.value}</p></div>
                </CardContent></Card>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMedia.map((media, i) => (
                <motion.div key={media.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                        <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                            {media.type === 'IMAGE' ? <Image className="h-10 w-10 text-slate-400" /> : <Film className="h-10 w-10 text-slate-400" />}
                        </div>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0"><p className="font-medium text-sm truncate">{media.name}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{media.size} • {media.uploader}</p></div>
                                <Badge className={`text-xs shrink-0 ${statusColor[media.status]}`}>{media.status}</Badge>
                            </div>
                            <div className="flex gap-2 mt-3">
                                {media.status === 'PENDING' && <Button size="sm" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-xs gap-1"><CheckCircle className="h-3 w-3" />Approve</Button>}
                                <Button size="sm" variant="destructive" className="text-xs gap-1"><Trash2 className="h-3 w-3" />Delete</Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    </div>
);
