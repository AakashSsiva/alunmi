import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Users, FileText, Network, MessageCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import { analyticsService } from '@/services/analytics.service';

interface ReportData { totalUsers: number; totalPosts: number; totalConnections: number; totalMessages: number; totalEvents: number; totalJobs: number; }

export const ReportsModule = () => {
    const [report, setReport] = useState<ReportData | null>(null);
    const [userGrowth, setUserGrowth] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiFetch<ReportData>('/api/admin/reports/overview'),
            analyticsService.getUserGrowth(),
        ]).then(([r, ug]) => { setReport(r); setUserGrowth(ug); }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const stats = report ? [
        { label: 'Total Users', value: report.totalUsers, icon: Users, color: 'from-blue-500 to-blue-600' },
        { label: 'Total Posts', value: report.totalPosts, icon: FileText, color: 'from-violet-500 to-violet-600' },
        { label: 'Connections', value: report.totalConnections, icon: Network, color: 'from-emerald-500 to-emerald-600' },
        { label: 'Messages', value: report.totalMessages, icon: MessageCircle, color: 'from-rose-500 to-rose-600' },
        { label: 'Events', value: report.totalEvents, icon: Users, color: 'from-amber-500 to-amber-600' },
        { label: 'Jobs', value: report.totalJobs, icon: FileText, color: 'from-teal-500 to-teal-600' },
    ] : [];

    const handleExport = (type: string) => {
        const data = type === 'users' ? JSON.stringify({ totalUsers: report?.totalUsers, growth: userGrowth }, null, 2) : JSON.stringify(report, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `${type}_report.json`; a.click();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Reports</h2>
                    <p className="text-slate-500 text-sm mt-1">Export and analyze platform data</p></div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 text-sm" onClick={() => handleExport('users')}><Download className="h-4 w-4" />User Report</Button>
                    <Button variant="outline" className="gap-2 text-sm" onClick={() => handleExport('overview')}><Download className="h-4 w-4" />Full Report</Button>
                </div>
            </div>

            {loading ? <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}>
                                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                    <CardContent className="p-4">
                                        <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${s.color} mb-3`}><s.icon className="h-4 w-4 text-white" /></div>
                                        <p className="text-2xl font-bold">{s.value.toLocaleString()}</p>
                                        <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <Card className="border-0 shadow-lg">
                        <CardHeader><CardTitle className="text-sm font-semibold">Alumni Registrations Over Time</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={userGrowth} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)' }} />
                                    <Bar dataKey="count" name="New Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};
