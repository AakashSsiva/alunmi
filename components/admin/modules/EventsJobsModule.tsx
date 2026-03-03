import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Briefcase, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/utils';

interface Event { id: number; title: string; date: string; location: string; eventType: string; status: string; capacity: number; registrations: number; }
interface Job { id: number; title: string; company: string; location: string; status: string; createdAt: string; }

export const EventsJobsModule = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            apiFetch<Event[]>('/api/admin/events'),
            apiFetch<Job[]>('/api/admin/jobs'),
        ]).then(([e, j]) => { setEvents(e); setJobs(j); }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const approveEvent = async (id: number) => {
        await apiFetch(`/api/admin/events/${id}/approve`, { method: 'PATCH' });
        setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'APPROVED' } : e));
    };

    const approveJob = async (id: number) => {
        await apiFetch(`/api/admin/jobs/${id}/approve`, { method: 'PATCH' });
        setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'APPROVED' } : j));
    };

    const statusColor: Record<string, string> = {
        APPROVED: 'bg-emerald-100 text-emerald-700', PENDING: 'bg-amber-100 text-amber-700', ACTIVE: 'bg-blue-100 text-blue-700',
    };

    return (
        <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Events & Job Management</h2>
                <p className="text-slate-500 text-sm mt-1">Manage events and job postings on the platform</p></div>

            {loading ? <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : (
                <Tabs defaultValue="events">
                    <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                        <TabsTrigger value="events" className="rounded-lg gap-2"><Calendar className="h-4 w-4" />Events ({events.length})</TabsTrigger>
                        <TabsTrigger value="jobs" className="rounded-lg gap-2"><Briefcase className="h-4 w-4" />Jobs ({jobs.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="events" className="mt-4">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <Table>
                                <TableHeader><TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                    <TableHead>Event</TableHead><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                                </TableRow></TableHeader>
                                <TableBody>
                                    {events.map((e, i) => (
                                        <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <TableCell><p className="font-medium text-sm">{e.title}</p><p className="text-xs text-slate-400">{e.location}</p></TableCell>
                                            <TableCell className="text-sm">{new Date(e.date).toLocaleDateString()}</TableCell>
                                            <TableCell><Badge variant="outline" className="text-xs">{e.eventType}</Badge></TableCell>
                                            <TableCell><Badge className={`text-xs ${statusColor[e.status] ?? 'bg-slate-100 text-slate-600'}`}>{e.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                {e.status === 'PENDING' && <Button size="sm" className="gap-1 text-xs bg-emerald-500 hover:bg-emerald-600" onClick={() => approveEvent(e.id)}><CheckCircle className="h-3.5 w-3.5" />Approve</Button>}
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                            {events.length === 0 && <div className="text-center py-10 text-slate-400">No events</div>}
                        </Card>
                    </TabsContent>

                    <TabsContent value="jobs" className="mt-4">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <Table>
                                <TableHeader><TableRow className="bg-slate-50 dark:bg-slate-800/50">
                                    <TableHead>Job Title</TableHead><TableHead>Company</TableHead><TableHead>Status</TableHead><TableHead>Posted</TableHead><TableHead className="text-right">Actions</TableHead>
                                </TableRow></TableHeader>
                                <TableBody>
                                    {jobs.map((j, i) => (
                                        <motion.tr key={j.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <TableCell className="font-medium text-sm">{j.title}</TableCell>
                                            <TableCell><p className="text-sm">{j.company}</p><p className="text-xs text-slate-400">{j.location}</p></TableCell>
                                            <TableCell><Badge className={`text-xs ${statusColor[j.status] ?? 'bg-slate-100 text-slate-600'}`}>{j.status}</Badge></TableCell>
                                            <TableCell className="text-xs text-slate-500">{new Date(j.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                {j.status === 'PENDING' && <Button size="sm" className="gap-1 text-xs bg-emerald-500 hover:bg-emerald-600" onClick={() => approveJob(j.id)}><CheckCircle className="h-3.5 w-3.5" />Approve</Button>}
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                            {jobs.length === 0 && <div className="text-center py-10 text-slate-400">No jobs</div>}
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};
