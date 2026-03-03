import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MessageCircle, Shield, Loader2, Eye, Send, Radio, TrendingUp, PieChart as PIcon } from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import { analyticsService } from '@/services/analytics.service';
import { useToast } from '@/hooks/use-toast';

interface Message {
    id: number; content: string; isRead: boolean; createdAt: string;
    sender: { name: string; email: string; profileImage?: string };
}

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const ChatMonitoringModule = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [msgStats, setMsgStats] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [broadcastText, setBroadcastText] = useState('');
    const [broadcasting, setBroadcasting] = useState(false);

    useEffect(() => {
        Promise.all([
            apiFetch<Message[]>('/api/admin/messages'),
            analyticsService.getMessageStats(),
        ]).then(([msgs, ms]) => {
            setMessages(Array.isArray(msgs) ? msgs : []);
            setMsgStats(Array.isArray(ms) ? ms : []);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const handleBroadcast = async () => {
        if (!broadcastText.trim()) return;
        setBroadcasting(true);
        try {
            await apiFetch('/api/admin/messages/broadcast', {
                method: 'POST',
                body: JSON.stringify({ content: broadcastText }),
            });
            toast({ title: 'Broadcast sent!', description: 'Message delivered to all alumni.' });
            setBroadcastText('');
        } catch {
            toast({ title: 'Error', description: 'Failed to send broadcast', variant: 'destructive' });
        } finally { setBroadcasting(false); }
    };

    const filtered = messages.filter(m =>
        m.sender?.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.content?.toLowerCase().includes(search.toLowerCase())
    );

    // Msg type distribution for pie
    const readDist = [
        { name: 'Read', value: messages.filter(m => m.isRead).length },
        { name: 'Unread', value: messages.filter(m => !m.isRead).length },
    ];

    const stats = [
        { label: 'Total Messages', value: messages.length, color: 'text-blue-600' },
        { label: 'Unread', value: messages.filter(m => !m.isRead).length, color: 'text-amber-600' },
        { label: 'Unique Senders', value: new Set(messages.map(m => m.sender?.name)).size, color: 'text-violet-600' },
        { label: 'Today', value: messages.filter(m => new Date(m.createdAt).toDateString() === new Date().toDateString()).length, color: 'text-emerald-600' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Chat Monitoring</h2>
                <p className="text-slate-500 text-sm mt-1">Monitor messages, view analytics, and broadcast to all alumni</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <p className="text-xs text-slate-500">{s.label}</p>
                                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Tabs defaultValue="messages">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                    <TabsTrigger value="messages" className="rounded-lg gap-2"><MessageCircle className="h-3.5 w-3.5" />Messages</TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-lg gap-2"><TrendingUp className="h-3.5 w-3.5" />Analytics</TabsTrigger>
                    <TabsTrigger value="broadcast" className="rounded-lg gap-2"><Radio className="h-3.5 w-3.5" />Broadcast</TabsTrigger>
                </TabsList>

                {/* ── Messages Tab ── */}
                <TabsContent value="messages" className="mt-4 space-y-4">
                    <div className="relative">
                        <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input className="pl-9" placeholder="Search by sender or content…" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                    ) : (
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                        <TableHead>Sender</TableHead><TableHead>Message</TableHead>
                                        <TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.map((msg, i) => (
                                        <motion.tr key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <TableCell>
                                                <p className="text-sm font-medium">{msg.sender?.name}</p>
                                                <p className="text-xs text-slate-400">{msg.sender?.email}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm max-w-xs truncate">{msg.content}</p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={msg.isRead ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}>
                                                    {msg.isRead ? 'Read' : 'Unread'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="outline" className="gap-1 text-xs"><Eye className="h-3.5 w-3.5" />View</Button>
                                                    <Button size="sm" variant="outline" className="gap-1 text-xs text-red-600 border-red-200"><Shield className="h-3.5 w-3.5" />Block</Button>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                            {filtered.length === 0 && <div className="text-center py-10 text-slate-400">No messages found</div>}
                        </Card>
                    )}
                </TabsContent>

                {/* ── Analytics Tab ── */}
                <TabsContent value="analytics" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-rose-500" />Message Activity (30 days)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={220}>
                                    <LineChart data={msgStats} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="date" fontSize={9} tickLine={false} axisLine={false} tickFormatter={v => v.slice(5)} />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                                        <Line type="monotone" dataKey="count" name="Messages" stroke="#f43f5e" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <PIcon className="h-4 w-4 text-indigo-500" />Read vs Unread
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie data={readDist} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" nameKey="name">
                                            {readDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                                        <Legend iconType="circle" iconSize={8} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* ── Broadcast Tab ── */}
                <TabsContent value="broadcast" className="mt-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <Radio className="h-5 w-5 text-indigo-600" />Broadcast Message to All Alumni
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                                ⚠️ This message will be sent to <strong>all registered alumni</strong> as a system notification.
                            </div>
                            <Textarea
                                placeholder="Type your broadcast message here…"
                                value={broadcastText}
                                onChange={e => setBroadcastText(e.target.value)}
                                rows={5}
                                className="resize-none"
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-slate-400">{broadcastText.length} characters</p>
                                <Button
                                    onClick={handleBroadcast}
                                    disabled={!broadcastText.trim() || broadcasting}
                                    className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {broadcasting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                    Send Broadcast
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
