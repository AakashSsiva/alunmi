import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck, Network, FileText, Settings, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/utils';

interface Notification { id: number; type: string; title: string; message: string; isRead: boolean; createdAt: string; user: { name: string; email: string }; }

const typeIcon = (type: string) => {
    if (type.includes('CONNECTION')) return <Network className="h-3.5 w-3.5" />;
    if (type.includes('POST')) return <FileText className="h-3.5 w-3.5" />;
    return <Bell className="h-3.5 w-3.5" />;
};
const typeBg = (type: string) => {
    if (type.includes('APPROVED')) return 'bg-emerald-100 text-emerald-600';
    if (type.includes('DENIED') || type.includes('REJECTED')) return 'bg-red-100 text-red-600';
    if (type.includes('CONNECTION')) return 'bg-blue-100 text-blue-600';
    return 'bg-violet-100 text-violet-600';
};

export const NotificationModule = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch<Notification[]>('/api/admin/notifications').then(setNotifications).catch(console.error).finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Notification Management</h2>
                <p className="text-slate-500 text-sm mt-1">Monitor all platform notifications sent to alumni</p></div>

            <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Total', value: notifications.length, color: 'text-blue-600' },
                { label: 'Unread', value: notifications.filter(n => !n.isRead).length, color: 'text-amber-600' },
                { label: 'Types', value: new Set(notifications.map(n => n.type)).size, color: 'text-violet-600' }].map(s => (
                    <Card key={s.label} className="border-0 shadow-sm"><CardContent className="p-4">
                        <p className="text-xs text-slate-500">{s.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                    </CardContent></Card>
                ))}
            </div>

            {loading ? <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
                <div className="space-y-3">
                    {notifications.length === 0 ? (
                        <div className="text-center py-12 text-slate-400"><Bell className="h-10 w-10 mx-auto mb-3 opacity-30" /><p>No notifications</p></div>
                    ) : notifications.map((n, i) => (
                        <motion.div key={n.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                            <Card className={`border-0 shadow-sm hover:shadow-md transition-all ${n.isRead ? '' : 'ring-1 ring-primary/30'}`}>
                                <CardContent className="p-4 flex items-start gap-3">
                                    <div className={`p-2 rounded-lg mt-0.5 ${typeBg(n.type)}`}>{typeIcon(n.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-sm">{n.title}</p>
                                            {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-2">{n.message}</p>
                                        <p className="text-xs text-slate-400 mt-1">To: {n.user?.name} • {new Date(n.createdAt).toLocaleString()}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs shrink-0">{n.type.replace(/_/g, ' ')}</Badge>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
