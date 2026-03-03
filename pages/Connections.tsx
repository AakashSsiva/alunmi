import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users, Search, UserPlus, UserCheck, UserX, MessageCircle,
  Network, Clock, Check, X, Loader2, Trash2, Globe
} from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { connectionService, Alumni, ConnectionRequest } from '@/services/connection.service';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// ─── Status Colors & Icons ────────────────────────────────────────────────────
const statusMeta: Record<string, { label: string; cls: string }> = {
  PENDING: { label: 'Pending', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  ACCEPTED: { label: 'Connected', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  REJECTED: { label: 'Rejected', cls: 'bg-red-100 text-red-700 border-red-200' },
};

// ─── Alumni Card ─────────────────────────────────────────────────────────────
const AlumniCard = ({
  alumni, connectionStatus, requestId, onConnect, onAccept, onReject, onRemove, onMessage, loading
}: {
  alumni: Alumni; connectionStatus?: string; requestId?: number;
  onConnect: (id: number) => void; onAccept: (id: number) => void;
  onReject: (id: number) => void; onRemove: (id: number) => void;
  onMessage: (id: number) => void; loading: boolean;
}) => {
  const avatar = alumni.profileImage
    ? alumni.profileImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(alumni.name)}&background=6366f1&color=fff&size=80`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <Card className="border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img src={avatar} alt={alumni.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-100 dark:ring-indigo-900" />
              {connectionStatus === 'ACCEPTED' && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-slate-800 dark:text-white leading-tight">{alumni.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{alumni.email}</p>
                  {alumni.graduationYear && (
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium">Class of {alumni.graduationYear}</p>
                  )}
                </div>
                {connectionStatus && (
                  <Badge className={`text-[10px] border shrink-0 ${statusMeta[connectionStatus]?.cls ?? 'bg-slate-100 text-slate-600'}`}>
                    {statusMeta[connectionStatus]?.label}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {!connectionStatus && (
                  <Button size="sm" className="gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 shadow-sm" disabled={loading} onClick={() => onConnect(alumni.id)}>
                    <UserPlus className="h-3.5 w-3.5" />Connect
                  </Button>
                )}
                {connectionStatus === 'ACCEPTED' && (
                  <>
                    <Button size="sm" className="gap-1.5 text-xs bg-violet-600 hover:bg-violet-700" onClick={() => onMessage(alumni.id)}>
                      <MessageCircle className="h-3.5 w-3.5" />Message
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => onRemove(alumni.id)} disabled={loading}>
                      <Trash2 className="h-3.5 w-3.5" />Remove
                    </Button>
                  </>
                )}
                {connectionStatus === 'PENDING' && requestId && (
                  <>
                    <Button size="sm" className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAccept(requestId)} disabled={loading}>
                      <Check className="h-3.5 w-3.5" />Accept
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => onReject(requestId)} disabled={loading}>
                      <X className="h-3.5 w-3.5" />Decline
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ─── Stats Row ────────────────────────────────────────────────────────────────
const StatsRow = ({ total, pending, connected }: { total: number; pending: number; connected: number }) => (
  <div className="grid grid-cols-3 gap-3 mb-6">
    {[
      { label: 'Total Alumni', value: total, icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
      { label: 'My Connections', value: connected, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
      { label: 'Pending', value: pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    ].map(s => (
      <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 200 }}>
        <Card className={`border-0 shadow-sm ${s.bg}`}>
          <CardContent className="px-4 py-3 flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm ${s.color}`}><s.icon className="h-4 w-4" /></div>
            <div>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-slate-500 leading-tight">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Connections = () => {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [alumniData, connsData, reqsData] = await Promise.all([
        apiFetch<Alumni[]>('/api/directory').catch(() => []),
        connectionService.getConnections().catch(() => []),
        connectionService.getPendingRequests().catch(() => []),
      ]);
      setAlumni(Array.isArray(alumniData) ? alumniData : []);
      setConnections(Array.isArray(connsData) ? connsData : []);
      setRequests(Array.isArray(reqsData) ? reqsData : []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const connectedIds = new Set(connections.map((c: any) =>
    c.sender?.id === Number(currentUser?.id) ? c.receiver?.id : c.sender?.id
  ));
  const pendingMap = new Map(requests.map(r => [r.sender?.id, r.id]));

  const getStatus = (id: number) => {
    if (connectedIds.has(id)) return 'ACCEPTED';
    if (pendingMap.has(id)) return 'PENDING';
    return undefined;
  };

  const act = async (fn: () => Promise<any>, successMsg: string) => {
    try { setActionLoading(true); await fn(); toast({ title: successMsg }); await fetchData(); }
    catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
    finally { setActionLoading(false); }
  };

  const handleConnect = (id: number) => act(() => connectionService.sendRequest(id), 'Connection request sent!');
  const handleAccept = (requestId: number) => act(() => connectionService.acceptRequest(requestId), 'Connection accepted!');
  const handleReject = (requestId: number) => act(() => connectionService.rejectRequest(requestId), 'Request declined');
  const handleRemove = (id: number) => {
    const conn = connections.find((c: any) =>
      (c.sender?.id === Number(currentUser?.id) && c.receiver?.id === id) ||
      (c.receiver?.id === Number(currentUser?.id) && c.sender?.id === id)
    );
    if (conn) act(() => connectionService.removeConnection(conn.id), 'Connection removed');
  };
  const handleMessage = (id: number) => navigate(`/messages?to=${id}`);

  const filtered = alumni.filter(a =>
    a.id !== Number(currentUser?.id) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()))
  );
  const myConnections = filtered.filter(a => connectedIds.has(a.id));
  const pendingList = alumni.filter(a => pendingMap.has(a.id));
  const discover = filtered.filter(a => !connectedIds.has(a.id) && !pendingMap.has(a.id));

  const cardProps = (a: Alumni) => ({
    alumni: a, connectionStatus: getStatus(a.id),
    requestId: pendingMap.get(a.id),
    onConnect: handleConnect, onAccept: handleAccept,
    onReject: handleReject, onRemove: handleRemove,
    onMessage: handleMessage, loading: actionLoading,
  });

  const EmptyState = ({ icon: Icon, text }: { icon: any; text: string }) => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-400">
      <Icon className="h-12 w-12 mb-3 opacity-30" />
      <p className="text-sm">{text}</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-violet-50/20 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 lg:px-6 py-8 max-w-6xl">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Alumni Network</h1>
                <p className="text-sm text-slate-500">Connect, grow together, and message your network</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          {!loading && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Total Alumni', value: alumni.length - 1, icon: Globe, color: 'text-blue-600', bg: 'from-blue-500 to-blue-600' },
                { label: 'My Connections', value: connections.length, icon: UserCheck, color: 'text-emerald-600', bg: 'from-emerald-500 to-emerald-600' },
                { label: 'Pending', value: requests.length, icon: Clock, color: 'text-amber-600', bg: 'from-amber-500 to-amber-600' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className={`h-1 bg-gradient-to-r ${s.bg}`} />
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${s.color}`}><s.icon className="h-4 w-4" /></div>
                      <div>
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-[11px] text-slate-500">{s.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input className="pl-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-indigo-500/30" placeholder="Search alumni by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Tabs */}
          {loading ? (
            <div className="flex items-center justify-center h-48"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>
          ) : (
            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-2xl shadow-sm mb-6 w-full justify-start gap-1">
                <TabsTrigger value="discover" className="rounded-xl gap-2 text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  <Globe className="h-3.5 w-3.5" />Discover <Badge variant="secondary" className="ml-1">{discover.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="network" className="rounded-xl gap-2 text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                  <Users className="h-3.5 w-3.5" />My Network <Badge variant="secondary" className="ml-1">{myConnections.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending" className="rounded-xl gap-2 text-sm data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  <Clock className="h-3.5 w-3.5" />Pending
                  {requests.length > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] font-bold px-1.5 rounded-full">{requests.length}</span>}
                </TabsTrigger>
              </TabsList>

              {/* DISCOVER */}
              <TabsContent value="discover">
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {discover.length === 0
                      ? <EmptyState icon={UserPlus} text="No new alumni to discover yet" />
                      : discover.map((a, i) => (
                        <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                          <AlumniCard {...cardProps(a)} />
                        </motion.div>
                      ))
                    }
                  </div>
                </AnimatePresence>
              </TabsContent>

              {/* MY NETWORK */}
              <TabsContent value="network">
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myConnections.length === 0
                      ? <EmptyState icon={Users} text="No connections yet — start discovering alumni!" />
                      : myConnections.map((a, i) => (
                        <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                          <AlumniCard {...cardProps(a)} />
                        </motion.div>
                      ))
                    }
                  </div>
                </AnimatePresence>
              </TabsContent>

              {/* PENDING REQUESTS */}
              <TabsContent value="pending">
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingList.length === 0
                      ? <EmptyState icon={Clock} text="No pending requests" />
                      : pendingList.map((a, i) => (
                        <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                          <AlumniCard {...cardProps(a)} />
                        </motion.div>
                      ))
                    }
                  </div>
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Connections;
