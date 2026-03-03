import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Search, MessageCircle, MoreVertical, Circle, Loader2, Phone, X } from 'lucide-react';
import { apiFetch } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useSearchParams } from 'react-router-dom';
import { connectionService } from '@/services/connection.service';
import { useToast } from '@/hooks/use-toast';

interface Conversation { id: number; partnerId: number; partnerName: string; partnerImage: string; lastMessage: string; unreadCount: number; lastMessageTime: string; }
interface Message { id: number; content: string; senderId: number; senderName: string; createdAt: string; isRead: boolean; }
interface Connection { id: number; sender: { id: number; name: string; profileImage?: string; email: string }; receiver: { id: number; name: string; profileImage?: string; email: string }; status: string; }

const avatar = (name: string, img?: string) =>
  img || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=64`;

const Messaging = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [conversationSearch, setConversationSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const fetchConversations = useCallback(async () => {
    const [convsData, connsData] = await Promise.all([
      apiFetch<Conversation[]>('/api/messages/threads').catch(() => []),
      connectionService.getConnections().catch(() => []),
    ]);
    setConversations(Array.isArray(convsData) ? convsData : []);
    setConnections(Array.isArray(connsData) ? connsData : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConversations();
    const poll = setInterval(fetchConversations, 6000);
    return () => clearInterval(poll);
  }, [fetchConversations]);

  // Auto-open conversation from ?to= param
  useEffect(() => {
    const toId = searchParams.get('to');
    if (toId) openConversation(Number(toId));
  }, [searchParams]);

  const openConversation = async (partnerId: number) => {
    setSelectedId(partnerId);
    setSidebarOpen(false);
    try {
      const data = await apiFetch<any>(`/api/messages/conversation/${partnerId}`);
      const msgs = Array.isArray(data) ? data : data?.messages ?? [];
      setMessages(msgs.filter((m: any) => m?.id));
    } catch { setMessages([]); }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedId || !user?.id) return;
    setSending(true);
    try {
      const res = await apiFetch<any>('/api/messages/send', {
        method: 'POST',
        body: JSON.stringify({ recipientId: selectedId, content: input }),
      });
      setMessages(prev => [...prev, {
        id: res?.id ?? Date.now(), senderId: Number(user.id), senderName: user.name ?? 'You',
        content: input, createdAt: new Date().toISOString(), isRead: false,
      }]);
      setInput('');
      fetchConversations();
    } catch { toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' }); }
    finally { setSending(false); }
  };

  // Build conversation list: connections + existing threads
  const acceptedConnections = connections.filter(c => c.status === 'ACCEPTED').map(c => {
    const partner = c.sender?.id === Number(user?.id) ? c.receiver : c.sender;
    return { id: c.id, partnerId: partner?.id, partnerName: partner?.name, partnerImage: partner?.profileImage, lastMessage: '', unreadCount: 0, lastMessageTime: '' };
  });
  const allConversations = [...conversations];
  acceptedConnections.forEach(ac => {
    if (!allConversations.find(c => c.partnerId === ac.partnerId)) allConversations.push(ac as Conversation);
  });
  const filteredConvs = allConversations.filter(c =>
    c.partnerName?.toLowerCase().includes(conversationSearch.toLowerCase())
  );

  const selectedPartner = allConversations.find(c => c.partnerId === selectedId);

  return (
    <DashboardLayout>
      <div
        className="flex h-[calc(100vh-64px)] -mx-4 md:-mx-6 lg:-mx-8 -mt-4 md:-mt-6"
        style={{ background: 'linear-gradient(135deg,#f6f7fb 0%,#eef0f8 100%)' }}
      >
        {/* ── LEFT: Conversation List ── */}
        <AnimatePresence>
          {(sidebarOpen || !selectedId) && (
            <motion.div
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="w-full md:w-80 flex flex-col shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="font-bold text-slate-800 dark:text-white text-base mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-indigo-600" />Messages
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input className="pl-8 h-8 text-xs bg-slate-50 border-slate-200" placeholder="Search conversations…" value={conversationSearch} onChange={e => setConversationSearch(e.target.value)} />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-indigo-500" /></div>
                ) : filteredConvs.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p>No conversations yet.</p>
                    <p className="text-xs mt-1">Connect with alumni to start chatting.</p>
                  </div>
                ) : (
                  filteredConvs.map((conv, i) => (
                    <motion.button
                      key={conv.partnerId}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => { setSelectedId(conv.partnerId); setSidebarOpen(false); openConversation(conv.partnerId); }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all border-b border-slate-50 dark:border-slate-800 ${selectedId === conv.partnerId
                          ? 'bg-indigo-50 dark:bg-indigo-950/30 border-l-2 border-l-indigo-500'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                      <div className="relative shrink-0">
                        <img src={avatar(conv.partnerName, conv.partnerImage)} alt={conv.partnerName} className="w-10 h-10 rounded-full object-cover" />
                        <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-emerald-400 fill-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-slate-800 dark:text-white truncate">{conv.partnerName}</p>
                          {conv.lastMessageTime && <p className="text-[10px] text-slate-400 shrink-0 ml-2">{new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage || 'Start a conversation'}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-indigo-600 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0">{conv.unreadCount}</Badge>
                      )}
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RIGHT: Chat Window ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedId && selectedPartner ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shrink-0">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded-lg hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
                <img src={avatar(selectedPartner.partnerName, selectedPartner.partnerImage)} alt="" className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-800 dark:text-white">{selectedPartner.partnerName}</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1"><Circle className="h-2 w-2 fill-emerald-400" />Active now</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="rounded-xl"><Phone className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="rounded-xl"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.03) 0%, transparent 50%)' }}>
                {messages.map((msg, i) => {
                  const isMine = msg.senderId === Number(user?.id);
                  return (
                    <motion.div key={msg.id ?? i} initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.03 }}
                      className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                      {!isMine && (
                        <img src={avatar(selectedPartner.partnerName, selectedPartner.partnerImage)} alt="" className="w-7 h-7 rounded-full mr-2 self-end shrink-0" />
                      )}
                      <div className={`max-w-[65%] group`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isMine
                            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-md'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-bl-md'
                          }`}>
                          {msg.content}
                        </div>
                        <p className={`text-[10px] text-slate-400 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isMine && <span className="ml-1">{msg.isRead ? '✓✓' : '✓'}</span>}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <form onSubmit={sendMessage} className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" className="rounded-xl shrink-0">
                    <Paperclip className="h-4 w-4 text-slate-400" />
                  </Button>
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    disabled={sending}
                    autoFocus
                  />
                  <Button type="submit" size="sm" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 gap-1.5 shadow-sm shadow-indigo-500/30" disabled={!input.trim() || sending}>
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="h-9 w-9 text-indigo-400" />
                </div>
                <p className="text-center font-medium text-slate-700 dark:text-slate-300">Select a conversation</p>
                <p className="text-center text-sm text-slate-400 mt-1">Or go to Connections to find new people</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messaging;
