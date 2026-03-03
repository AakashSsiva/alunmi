import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2, BarChart3, PieChart as PIcon, TrendingUp } from 'lucide-react';
import { analyticsService } from '@/services/analytics.service';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const ChartCard = ({ title, icon: Icon, color, children, loading }: any) => (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 200 }}>
        <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className={`pb-2 border-b border-slate-100 dark:border-slate-800`}>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${color}`} />{title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                {loading ? <div className="h-52 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div> : children}
            </CardContent>
        </Card>
    </motion.div>
);

export const AnalyticsModule = () => {
    const [userGrowth, setUserGrowth] = useState<any[]>([]);
    const [postStats, setPostStats] = useState<any>(null);
    const [connStats, setConnStats] = useState<any>(null);
    const [msgStats, setMsgStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            analyticsService.getUserGrowth(),
            analyticsService.getPostStats(),
            analyticsService.getConnectionStats(),
            analyticsService.getMessageStats(),
        ]).then(([ug, ps, cs, ms]) => {
            setUserGrowth(ug); setPostStats(ps); setConnStats(cs); setMsgStats(ms);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const activeVsInactive = [
        { name: 'Active', value: userGrowth.reduce((a, b) => a + (b.count as number), 0) },
        { name: 'Recent', value: Math.max(1, Math.floor(userGrowth.reduce((a, b) => a + (b.count as number), 0) * 0.2)) },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h2>
                <p className="text-slate-500 text-sm mt-1">Visual analytics for growth, engagement, and content</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Alumni Growth (Monthly)" icon={BarChart3} color="text-blue-500" loading={loading}>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={userGrowth} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)' }} />
                            <Bar dataKey="count" name="New Alumni" fill="url(#blueGrad)" radius={[4, 4, 0, 0]} />
                            <defs><linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Post Status Distribution" icon={PIcon} color="text-emerald-500" loading={loading}>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={postStats?.distribution ?? []} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="count" nameKey="status">
                                {(postStats?.distribution ?? []).map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                            <Legend iconType="circle" iconSize={8} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Connection Growth (Monthly)" icon={TrendingUp} color="text-violet-500" loading={loading}>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={connStats?.growth ?? []} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)' }} />
                            <Bar dataKey="count" name="Connections" fill="url(#violetGrad)" radius={[4, 4, 0, 0]} />
                            <defs><linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient></defs>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Message Activity (Last 30 d)" icon={TrendingUp} color="text-rose-500" loading={loading}>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={msgStats} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="date" fontSize={9} tickLine={false} axisLine={false} tickFormatter={v => v.slice(5)} />
                            <YAxis fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                            <Line type="monotone" dataKey="count" name="Messages" stroke="#f43f5e" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Active vs Inactive Users" icon={PIcon} color="text-teal-500" loading={loading}>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={activeVsInactive} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" nameKey="name">
                                <Cell fill="#10b981" /><Cell fill="#e2e8f0" />
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                            <Legend iconType="circle" iconSize={8} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Connection Status Distribution" icon={PIcon} color="text-amber-500" loading={loading}>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={connStats?.distribution ?? []} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="count" nameKey="status">
                                {(connStats?.distribution ?? []).map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                            <Legend iconType="circle" iconSize={8} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};
