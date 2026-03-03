import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Network, Search, Loader2, ArrowRight, Trash2, BarChart3, PieChart as PIcon } from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import { analyticsService } from '@/services/analytics.service';

interface Connection {
    id: number; status: string; createdAt: string;
    sender: { name: string; email: string };
    receiver: { name: string; email: string };
}

const STATUS_COLORS: Record<string, string> = {
    ACCEPTED: 'bg-emerald-100 text-emerald-700',
    PENDING: 'bg-amber-100 text-amber-700',
    REJECTED: 'bg-red-100 text-red-700',
    BLOCKED: 'bg-slate-100 text-slate-700',
};
const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export const ConnectionManagementModule = () => {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [connGrowth, setConnGrowth] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiFetch<Connection[]>('/api/admin/connections'),
            analyticsService.getConnectionStats(),
        ]).then(([conns, cs]) => {
            setConnections(Array.isArray(conns) ? conns : []);
            setConnGrowth((cs as any)?.growth ?? []);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Remove this connection?')) return;
        await apiFetch(`/api/admin/connections/${id}`, { method: 'DELETE' }).catch(console.error);
        setConnections(prev => prev.filter(c => c.id !== id));
    };

    const filtered = connections.filter(c => {
        const matchSearch = c.sender.name.toLowerCase().includes(search.toLowerCase()) ||
            c.receiver.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Status distribution for pie chart
    const statusDist = Object.entries(
        connections.reduce((acc, c) => { acc[c.status] = (acc[c.status] ?? 0) + 1; return acc; }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    const statCards = [
        { label: 'Total Connections', value: connections.length, color: 'text-blue-600' },
        { label: 'Accepted', value: connections.filter(c => c.status === 'ACCEPTED').length, color: 'text-emerald-600' },
        { label: 'Pending', value: connections.filter(c => c.status === 'PENDING').length, color: 'text-amber-600' },
        { label: 'Rejected', value: connections.filter(c => c.status === 'REJECTED').length, color: 'text-red-600' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Connection Management</h2>
                <p className="text-slate-500 text-sm mt-1">Monitor connections, view analytics, and remove problematic connections</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {statCards.map((s, i) => (
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

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-indigo-500" />Connection Growth (Monthly)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={connGrowth} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)' }} />
                                <Bar dataKey="count" name="Connections" fill="url(#connGrad)" radius={[4, 4, 0, 0]} />
                                <defs>
                                    <linearGradient id="connGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <PIcon className="h-4 w-4 text-emerald-500" />Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={statusDist} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" nameKey="name">
                                    {statusDist.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 8, border: 'none' }} />
                                <Legend iconType="circle" iconSize={8} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input className="pl-9" placeholder="Search by alumni name…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="ACCEPTED">Accepted</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
                <Card className="border-0 shadow-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                <TableHead>From</TableHead><TableHead></TableHead><TableHead>To</TableHead>
                                <TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((c, i) => (
                                <motion.tr key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell>
                                        <div><p className="font-medium text-sm">{c.sender.name}</p><p className="text-xs text-slate-400">{c.sender.email}</p></div>
                                    </TableCell>
                                    <TableCell><ArrowRight className="h-4 w-4 text-slate-300" /></TableCell>
                                    <TableCell>
                                        <div><p className="font-medium text-sm">{c.receiver.name}</p><p className="text-xs text-slate-400">{c.receiver.email}</p></div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`text-xs ${STATUS_COLORS[c.status] ?? 'bg-slate-100 text-slate-600'}`}>{c.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="destructive" className="gap-1 text-xs" onClick={() => handleDelete(c.id)}>
                                            <Trash2 className="h-3 w-3" />Remove
                                        </Button>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                    {filtered.length === 0 && <div className="text-center py-10 text-slate-400">No connections found</div>}
                </Card>
            )}
        </div>
    );
};
