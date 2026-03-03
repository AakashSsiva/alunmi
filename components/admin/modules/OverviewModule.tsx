import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Network, MessageCircle, TrendingUp, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/utils';

interface OverviewData {
    totalAlumni: number; activeUsers: number; pendingPosts: number; approvedPosts: number;
}
interface ReportData {
    totalUsers: number; totalPosts: number; totalConnections: number; totalMessages: number; totalEvents: number; totalJobs: number;
}

const card = (d: { title: string; value: number | string; sub: string; icon: any; color: string; bg: string }) => (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
        <Card className={`relative overflow-hidden border-0 shadow-lg ${d.bg}`}>
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${d.color}`} />
            <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${d.color} shadow-md`}>
                        <d.icon className="h-5 w-5 text-white" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{d.title}</p>
                <p className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300">{d.value}</p>
                <p className="text-xs text-slate-400 mt-1">{d.sub}</p>
            </CardContent>
        </Card>
    </motion.div>
);

export const OverviewModule = () => {
    const [ov, setOv] = useState<OverviewData | null>(null);
    const [rp, setRp] = useState<ReportData | null>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiFetch<OverviewData>('/api/admin/analytics/overview'),
            apiFetch<ReportData>('/api/admin/reports/overview'),
            apiFetch<{ logs: any[] }>('/api/admin/logs')
        ]).then(([o, r, l]) => { setOv(o); setRp(r); setLogs(l.logs.slice(0, 8)); }).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

    const cards = [
        { title: 'Total Alumni', value: ov?.totalAlumni ?? 0, sub: 'Registered members', icon: Users, color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50 dark:bg-blue-950/30' },
        { title: 'Active Users', value: ov?.activeUsers ?? 0, sub: 'Last 7 days', icon: TrendingUp, color: 'from-emerald-500 to-emerald-700', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { title: 'Total Posts', value: rp?.totalPosts ?? 0, sub: 'All platforms', icon: FileText, color: 'from-violet-500 to-violet-700', bg: 'bg-violet-50 dark:bg-violet-950/30' },
        { title: 'Pending Posts', value: ov?.pendingPosts ?? 0, sub: 'Awaiting review', icon: Clock, color: 'from-amber-500 to-amber-700', bg: 'bg-amber-50 dark:bg-amber-950/30' },
        { title: 'Total Connections', value: rp?.totalConnections ?? 0, sub: 'Accepted pairs', icon: Network, color: 'from-pink-500 to-pink-700', bg: 'bg-pink-50 dark:bg-pink-950/30' },
        { title: 'Total Messages', value: rp?.totalMessages ?? 0, sub: 'All time', icon: MessageCircle, color: 'from-teal-500 to-teal-700', bg: 'bg-teal-50 dark:bg-teal-950/30' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Platform Overview</h2>
                <p className="text-slate-500 text-sm mt-1">Live metrics across the entire alumni network</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{cards.map(c => card(c))}</div>

            <Card className="border-0 shadow-lg">
                <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Clock className="h-4 w-4 text-primary" /> Recent Admin Activity</CardTitle></CardHeader>
                <CardContent>
                    {logs.length === 0 ? (
                        <p className="text-center text-slate-400 py-8">No recent activity</p>
                    ) : (
                        <div className="space-y-3">
                            {logs.map((log, i) => (
                                <motion.div key={log.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <div className={`p-2 rounded-lg mt-0.5 ${log.actionType.includes('APPROVE') ? 'bg-emerald-100 text-emerald-600' : log.actionType.includes('DENY') || log.actionType.includes('REJECT') ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {log.actionType.includes('APPROVE') ? <CheckCircle className="h-3.5 w-3.5" /> : log.actionType.includes('DENY') ? <AlertCircle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{log.actionType.replace(/_/g, ' ')}</p>
                                        <p className="text-xs text-slate-400">{log.admin?.name} • {new Date(log.createdAt).toLocaleString()}</p>
                                    </div>
                                    <Badge variant="outline" className="text-xs shrink-0">{log.targetType}</Badge>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
