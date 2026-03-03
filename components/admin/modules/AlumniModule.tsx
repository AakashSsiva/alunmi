import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trash2, Key, UserCheck, UserX, Loader2, Users } from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface User { id: number; name: string; email: string; role: string; }

export const AlumniModule = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        apiFetch<User[]>('/api/admin/users').then(setUsers).catch(console.error).finally(() => setLoading(false));
    }, []);

    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    const handleDelete = async (u: User) => {
        if (!confirm(`Delete ${u.name}?`)) return;
        try {
            await apiFetch(`/api/admin/users/${u.id}`, { method: 'DELETE' });
            setUsers(prev => prev.filter(x => x.id !== u.id));
            toast({ title: 'User deleted', description: u.name });
        } catch { toast({ title: 'Error', variant: 'destructive', description: 'Could not delete user' }); }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Alumni Management</h2>
                <p className="text-slate-500 text-sm mt-1">View, search, and manage alumni accounts</p>
            </div>

            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input className="pl-9" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Badge variant="secondary" className="flex items-center gap-1 px-3"><Users className="h-3.5 w-3.5" />{filtered.length}</Badge>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
                <Card className="border-0 shadow-lg overflow-hidden">
                    <Table>
                        <TableHeader><TableRow className="bg-slate-50 dark:bg-slate-800/50">
                            <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Actions</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                            {filtered.map((u, i) => (
                                <motion.tr key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <TableCell className="font-medium">{u.name}</TableCell>
                                    <TableCell className="text-slate-500">{u.email}</TableCell>
                                    <TableCell><Badge variant={u.role === 'ADMIN' ? 'destructive' : 'secondary'}>{u.role}</Badge></TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" variant="outline" className="gap-1 text-xs"><UserCheck className="h-3.5 w-3.5" />Activate</Button>
                                            <Button size="sm" variant="outline" className="gap-1 text-xs text-amber-600 border-amber-200"><UserX className="h-3.5 w-3.5" />Deactivate</Button>
                                            <Button size="sm" variant="destructive" className="gap-1 text-xs" onClick={() => handleDelete(u)}><Trash2 className="h-3.5 w-3.5" />Delete</Button>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                    {filtered.length === 0 && <div className="text-center py-10 text-slate-400">No alumni found</div>}
                </Card>
            )}
        </div>
    );
};
