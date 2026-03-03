import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react';
import { type Event as MockEvent } from '@/lib/mockData';
import { apiFetch } from '@/lib/utils';
import { toast } from 'sonner';

const Events = () => {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState<MockEvent[]>([]);

  useEffect(() => {
    (async () => {
      const data = await apiFetch<Array<{ id: number; title: string; description: string; date: string; location: string; status?: string }>>('/api/events');
      const mapped: MockEvent[] = data.map(e => ({
        id: String(e.id),
        title: e.title,
        description: e.description,
        date: e.date.split('T')[0],
        time: '',
        location: e.location,
        type: 'workshop',
        organizer: 'Admin',
        organizerId: '0',
        currentAttendees: 0,
        status: e.status?.toLowerCase() === 'approved' ? 'approved' : 'pending',
      }));
      setEvents(mapped);
    })();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredEvents = events.filter(event => {
    if (user?.role !== 'admin' && event.status !== 'approved') return false;
    return true;
  });

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const dateStr = String(formData.get('date'));
    const payload = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: new Date(dateStr).toISOString(),
      location: formData.get('location') as string,
      eventType: formData.get('type') as string,
      capacity: formData.get('maxAttendees') ? Number(formData.get('maxAttendees')) : null,
    };
    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('Please login to create an event.');
      return;
    }
    try {
      const created = await apiFetch<{ id: number }>(
        '/api/events',
        { method: 'POST', body: JSON.stringify(payload) }
      );
      setEvents([{ ...payload, id: String(created.id), time: '', type: 'workshop', organizer: user?.name || 'Unknown', organizerId: user?.id || '', currentAttendees: 0, status: 'pending' } as MockEvent, ...events]);
      setDialogOpen(false);
      toast.success(user?.role === 'admin' ? 'Event created successfully!' : 'Event submitted for approval');
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to create event.');
    }
  };

  const handleRegister = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, currentAttendees: event.currentAttendees + 1 }
        : event
    ));
    toast.success('Successfully registered for the event!');
  };

  const Layout = isAuthenticated ? DashboardLayout : 'div';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Events & Reunions</h1>
            <p className="text-muted-foreground">Upcoming events and networking opportunities</p>
          </div>
          {isAuthenticated && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Organize events and reunions for the alumni community
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateEvent}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input id="title" name="title" placeholder="Annual Tech Meetup" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe the event..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input id="date" name="date" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time *</Label>
                        <Input id="time" name="time" type="time" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input id="location" name="location" placeholder="Venue or Online platform" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Event Type *</Label>
                        <Select name="type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reunion">Reunion</SelectItem>
                            <SelectItem value="webinar">Webinar</SelectItem>
                            <SelectItem value="networking">Networking</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxAttendees">Max Attendees (Optional)</Label>
                        <Input id="maxAttendees" name="maxAttendees" type="number" min="1" placeholder="100" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="submit">Create Event</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length === 0 ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">No upcoming events</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={event.type === 'reunion' ? 'default' : 'secondary'}>
                      {event.type}
                    </Badge>
                    {user?.role === 'admin' && event.status !== 'approved' && (
                      <Badge variant={event.status === 'pending' ? 'secondary' : 'destructive'}>
                        {event.status}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {event.currentAttendees} registered
                      {event.maxAttendees && ` / ${event.maxAttendees} max`}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-3">
                      Organized by {event.organizer}
                    </p>
                    {user?.role === 'admin' && event.status !== 'approved' ? (
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={async () => {
                          try {
                            await apiFetch(`/api/events/${event.id}/approve`, { method: 'PATCH' });
                            setEvents(prev => prev.map(ev => ev.id === event.id ? { ...ev, status: 'approved' } : ev));
                            toast.success('Event approved');
                          } catch {
                            toast.error('Failed to approve');
                          }
                        }}
                      >
                        Approve
                      </Button>
                    ) : (
                      event.status === 'approved' && isAuthenticated && (
                        <Button
                          className="w-full"
                          size="sm"
                          onClick={() => handleRegister(event.id)}
                          disabled={event.maxAttendees ? event.currentAttendees >= event.maxAttendees : false}
                        >
                          {event.maxAttendees && event.currentAttendees >= event.maxAttendees
                            ? 'Event Full'
                            : 'Register Now'}
                        </Button>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
