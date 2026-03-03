import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, AlertCircle, CheckCircle, Clock, Loader2, Lock, UserCheck } from 'lucide-react';
import { apiFetch } from '@/lib/utils';

interface LogEntry { id: number; actionType: string; targetType: string; targetId: number; feedback: string; createdAt: string; admin: { name: string; email: string }; }

const actionColor = (t: string) => {
    if (t.includes('APPROVE')) return 'bg-emerald-100 text-emerald-700';
    if (t.includes('DENY') || t.includes('REJECT') || t.includes('DELETE')) return 'bg-red-100 text-red-700';
    return 'bg-blue-100 text-blue-700';
};
const ActionIcon = ({ t }: { t: string }) =>
    t.includes('APPROVE') ? <CheckCircle className="h-3.5 w-3.5" /> : t.includes('DENY') || t.includes('DELETE') ? <AlertCircle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />;

export const SecurityModule = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch<{ logs: LogEntry[]; total: number }>('/api/admin/logs').then(d => setLogs(d.logs)).catch(console.error).finally(() => setLoading(false));
    }, []);

    const adminSet = new Set(logs.map(l => l.admin?.name));

    return (
        <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Security & Access Control</h2>
                <p className="text-slate-500 text-sm mt-1">Audit logs, admin roles, and authentication monitoring</p></div>

            <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Admin Actions', value: logs.length, icon: Shield, color: 'text-blue-600 bg-blue-50' },
                { label: 'Active Admins', value: adminSet.size, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Critical Actions', value: logs.filter(l => l.actionType.includes('DELETE') || l.actionType.includes('DENY')).length, icon: Lock, color: 'text-red-600 bg-red-50' }].map(s => (
                    <Card key={s.label} className="border-0 shadow-sm"><CardContent className="p-4 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${s.color}`}><s.icon className="h-4 w-4" /></div>
                        <div><p className="text-xs text-slate-500">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>
                    </CardContent></Card>
                ))}
            </div>

            <Card className="border-0 shadow-lg">
                <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />Admin Audit Log</CardTitle></CardHeader>
                <CardContent>
                    {loading ? <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
                        <Table>
                            <TableHeader><TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                <TableHead>Action</TableHead><TableHead>Admin</TableHead><TableHead>Target</TableHead><TableHead>Details</TableHead><TableHead>Time</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {logs.map((log, i) => (
                                    <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <TableCell>
                                            <Badge className={`text-xs gap-1 ${actionColor(log.actionType)}`}><ActionIcon t={log.actionType} />{log.actionType.replace(/_/g, ' ')}</Badge>
                                        </TableCell>
                                        <TableCell><p className="text-sm font-medium">{log.admin?.name}</p><p className="text-xs text-slate-400">{log.admin?.email}</p></TableCell>
                                        <TableCell><Badge variant="outline" className="text-xs">{log.targetType} #{log.targetId}</Badge></TableCell>
                                        <TableCell className="text-xs text-slate-500 max-w-xs truncate">{log.feedback || '—'}</TableCell>
                                        <TableCell className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleString()}</TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    {!loading && logs.length === 0 && <div className="text-center py-10 text-slate-400">No audit logs</div>}
                </CardContent>
            </Card>
        </div>
    );
};
