import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, MapPin, Clock, DollarSign, Plus, Search, Filter } from 'lucide-react';
import { type Job as MockJob } from '@/lib/mockData';
import { apiFetch } from '@/lib/utils';
import { toast } from 'sonner';

const Jobs = () => {
  const { user, isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<MockJob[]>([]);
  
  useEffect(() => {
    (async () => {
      const data = await apiFetch<Array<{ id: number; title: string; company: string; location: string; description: string; url?: string | null }>>('/api/jobs');
      const mapped: MockJob[] = data.map(j => ({
        id: String(j.id),
        title: j.title,
        company: j.company,
        location: j.location,
        type: 'full-time',
        domain: 'General',
        experience: '0+ years',
        salary: undefined,
        description: j.description,
        postedBy: 'Admin',
        postedById: '0',
        postedDate: new Date().toISOString().split('T')[0],
        status: 'approved',
        applicants: 0,
      }));
      setJobs(mapped);
    })();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredJobs = jobs.filter(job => {
    if (user?.role !== 'admin' && job.status !== 'approved') return false;
    
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesDomain = filterDomain === 'all' || job.domain === filterDomain;
    
    return matchesSearch && matchesType && matchesDomain;
  });

  const handlePostJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      url: String(formData.get('url') || '' ) || undefined,
    };
    const created = await apiFetch<{ id: number }>(
      '/api/jobs',
      { method: 'POST', body: JSON.stringify(payload) }
    );
    setJobs([{ 
      id: String(created.id),
      type: 'full-time',
      domain: String(formData.get('domain') || 'General'),
      experience: String(formData.get('experience') || '0+ years'),
      salary: (formData.get('salary') as string) || undefined,
      postedBy: user?.name || 'Unknown',
      postedById: user?.id || '',
      postedDate: new Date().toISOString().split('T')[0],
      status: user?.role === 'admin' ? 'approved' : 'pending',
      applicants: 0,
      ...payload,
    } as MockJob, ...jobs]);
    setDialogOpen(false);
    toast.success(user?.role === 'admin' ? 'Job posted successfully!' : 'Job submitted for approval');
  };

  const Layout = isAuthenticated ? DashboardLayout : 'div';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground">Explore career opportunities posted by alumni</p>
          </div>
          {isAuthenticated && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Post a Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Post a Job Opportunity</DialogTitle>
                  <DialogDescription>
                    Share job openings with the alumni network
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePostJob}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title *</Label>
                        <Input id="title" name="title" placeholder="Senior Software Engineer" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input id="company" name="company" placeholder="Company Name" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input id="location" name="location" placeholder="City, Country" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Job Type *</Label>
                        <Select name="type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="domain">Domain *</Label>
                        <Input id="domain" name="domain" placeholder="e.g., Software Development" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Required *</Label>
                        <Input id="experience" name="experience" placeholder="e.g., 3+ years" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range (Optional)</Label>
                      <Input id="salary" name="salary" placeholder="e.g., ₹15-20 LPA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe the role, requirements, and responsibilities..."
                        rows={5}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="submit">Post Job</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="Software Development">Software Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">No jobs found matching your criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{job.company}</CardDescription>
                    </div>
                    <Badge variant={job.status === 'approved' ? 'default' : job.status === 'pending' ? 'secondary' : 'destructive'}>
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {job.experience}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground">{job.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      Posted by {job.postedBy} • {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                    {job.status === 'approved' && (
                      <Button size="sm">Apply Now</Button>
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

export default Jobs;
