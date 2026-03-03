import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Linkedin, Github, Twitter, MapPin, Briefcase, Eye, Check, X, Clock, RotateCcw } from 'lucide-react';
import { type Alumni } from '@/lib/mockData';
import { apiFetch } from '@/lib/utils';
import { toast } from 'sonner';
import ProfilePopup from '@/components/profile/ProfilePopup';

const Directory = () => {
  const { isAuthenticated, user } = useAuth();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, string>>({});
  const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await apiFetch<Array<{
        id: number;
        name: string;
        email: string;
        department?: string;
        graduationYear?: number;
        currentCompany?: string;
        currentPosition?: string;
        location?: string;
        bio?: string;
        skills?: string;
        linkedin?: string;
        github?: string;
        twitter?: string;
        profileImage?: string;
      }>>('/api/directory');
      setAlumni(
        data.map(a => ({
          id: String(a.id),
          name: a.name,
          email: a.email,
          department: a.department || 'Unknown',
          graduationYear: a.graduationYear || 0,
          currentCompany: a.currentCompany,
          currentPosition: a.currentPosition,
          location: a.location,
          bio: a.bio,
          skills: a.skills ? JSON.parse(a.skills) : [],
          linkedin: a.linkedin,
          github: a.github,
          twitter: a.twitter,
          status: 'approved',
          profileImage: a.profileImage,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchConnectionStatuses();
      fetchReceivedRequests();
    }
  }, [isAuthenticated, user]);

  const fetchConnectionStatuses = async () => {
    if (!user) return;

    try {
      const statuses: Record<string, string> = {};
      for (const person of alumni) {
        if (person.id !== user.id) {
          const response = await apiFetch<{ status: string }>(`/api/connections/status/${person.id}`);
          statuses[person.id] = response.status;
        }
      }
      setConnectionStatuses(statuses);
    } catch (error) {
      console.error('Error fetching connection statuses:', error);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      const requests = await apiFetch<any[]>('/api/connections/received');
      setReceivedRequests(requests);
    } catch (error) {
      console.error('Error fetching received requests:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');

  const filteredAlumni = alumni.filter(person => {
    if (person.status !== 'approved') return false;

    // Hide current user's profile
    if (user && person.id === user.id) return false;

    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.currentPosition?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || person.department === filterDepartment;
    const matchesYear = filterYear === 'all' || person.graduationYear.toString() === filterYear;

    return matchesSearch && matchesDepartment && matchesYear;
  });

  const handleConnect = async (alumniId: string) => {
    try {
      await apiFetch('/api/connections/send', {
        method: 'POST',
        body: JSON.stringify({ receiverId: parseInt(alumniId) }),
      });

      toast.success('Connection request sent!');
      setConnectionStatuses(prev => ({ ...prev, [alumniId]: 'PENDING' }));
    } catch (error: any) {
      console.error('Error sending connection request:', error);
      toast.error(error.message || 'Failed to send connection request');
    }
  };

  const handleCancelRequest = async (alumniId: string) => {
    try {
      await apiFetch(`/api/connections/cancel/${alumniId}`, {
        method: 'DELETE',
      });

      toast.success('Connection request cancelled!');
      setConnectionStatuses(prev => ({ ...prev, [alumniId]: 'none' }));
    } catch (error: any) {
      console.error('Error cancelling connection request:', error);
      toast.error(error.message || 'Failed to cancel connection request');
    }
  };

  const handleRespondToRequest = async (requestId: number, action: 'ACCEPT' | 'REJECT') => {
    try {
      await apiFetch('/api/connections/respond', {
        method: 'PATCH',
        body: JSON.stringify({ requestId, action }),
      });

      toast.success(`Request ${action.toLowerCase()}ed!`);
      setReceivedRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error: any) {
      console.error('Error responding to request:', error);
      toast.error('Failed to respond to request');
    }
  };

  const handleViewProfile = (person: any) => {
    setSelectedProfile(person);
    setProfilePopupOpen(true);
  };

  const Layout = isAuthenticated ? DashboardLayout : 'div';

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Alumni Directory</h1>
          <p className="text-muted-foreground">Connect with fellow alumni from ACE</p>
        </div>

        {/* Connection Requests Box */}
        {isAuthenticated && receivedRequests.length > 0 && (
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Connection Requests ({receivedRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {receivedRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {request.sender.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{request.sender.name}</p>
                        <p className="text-sm text-muted-foreground">{request.sender.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleRespondToRequest(request.id, 'ACCEPT')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRespondToRequest(request.id, 'REJECT')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science & Engineering">Computer Science & Engineering</SelectItem>
                  <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                  <SelectItem value="Electrical & Electronics">Electrical & Electronics</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Graduation Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                  <SelectItem value="2017">2017</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredAlumni.length} of {alumni.filter(a => a.status === 'approved').length} alumni
        </div>

        {/* Alumni Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlumni.length === 0 ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="py-12 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">No alumni found matching your criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredAlumni.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {person.profileImage ? (
                        <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                          <img src={person.profileImage} alt={person.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold flex-shrink-0">
                          {person.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{person.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {person.currentPosition || 'Alumni'}
                          {person.currentCompany && ` at ${person.currentCompany}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProfile(person)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Profile Popup */}
      <ProfilePopup
        profile={selectedProfile}
        isOpen={profilePopupOpen}
        onClose={() => setProfilePopupOpen(false)}
      />
    </Layout>
  );
};

export default Directory;
