import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/utils';

const Settings = () => {
  const { user, login, updateUser } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);

  useEffect(() => {
    if (user?.department) {
      setDepartment(user.department);
    }
  }, [user?.department]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const profileData = {
      name: formData.get('name') as string,
      department: department,
      graduationYear: parseInt(formData.get('year') as string) || undefined,
      currentCompany: formData.get('company') as string,
      currentPosition: formData.get('position') as string,
      location: formData.get('location') as string,
      bio: formData.get('bio') as string,
      skills: (formData.get('skills') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [],
      linkedin: formData.get('linkedin') as string,
      github: formData.get('github') as string,
      twitter: formData.get('twitter') as string,
      profileImage: profileImage,
    };

    try {
      // Try API update first
      const updatedApiUser = await apiFetch<any>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      updateUser({
        name: updatedApiUser.name,
        department: updatedApiUser.department,
        graduationYear: updatedApiUser.graduationYear,
        company: updatedApiUser.currentCompany,
        position: updatedApiUser.currentPosition,
        profileImage: updatedApiUser.profileImage,
      });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      // Fallback to localStorage for demo mode
      const token = localStorage.getItem('auth_token');
      if (token?.startsWith('demo_token_')) {
        // Demo mode - save to localStorage
        const currentUser = localStorage.getItem('alumni_user');
        if (currentUser) {
          const updatedUser = {
            ...JSON.parse(currentUser),
            name: profileData.name,
            department: profileData.department,
            graduationYear: profileData.graduationYear,
            company: profileData.currentCompany,
            position: profileData.currentPosition,
          };
          localStorage.setItem('alumni_user', JSON.stringify(updatedUser));
          toast.success('Profile updated successfully! (Demo Mode)');

          // Re-authenticate to update context state without reload
          if (user?.email) {
            const demoUsers: any = {
              'admin@example.com': 'admin123',
              'alumni@example.com': 'alumni123'
            };
            if (demoUsers[user.email]) {
              await login(user.email, demoUsers[user.email]);
            }
          }
          return;
        }
      }
      console.error('Error updating profile:', error);
      const errorMessage = error?.message || error?.error?.message || 'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center sm:items-start gap-4 sm:flex-row">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-bold text-slate-400">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        )}
                      </div>
                      <label
                        htmlFor="profile-upload"
                        className="absolute inset-0 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                      >
                        <Camera className="w-6 h-6" />
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setProfileImage(reader.result as string);
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <div className="text-center sm:text-left pt-2">
                      <h3 className="font-semibold text-sm">Profile Picture</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
                        Upload a new avatar. Recommended size is 256x256px. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email} disabled />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select name="department" value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science & Engineering">Computer Science & Engineering</SelectItem>
                          <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                          <SelectItem value="Electrical & Electronics">Electrical & Electronics</SelectItem>
                          <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Graduation Year</Label>
                      <Input id="year" name="year" type="number" defaultValue={user?.graduationYear} />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Current Company</Label>
                      <Input id="company" name="company" defaultValue={user?.company} placeholder="Your company" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Current Position</Label>
                      <Input id="position" name="position" defaultValue={user?.position} placeholder="Your role" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" placeholder="City, Country" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input id="skills" name="skills" placeholder="React, Node.js, Python" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" placeholder="Tell us about yourself..." rows={4} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/yourprofile" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input id="github" name="github" placeholder="github.com/yourprofile" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" name="twitter" placeholder="twitter.com/yourprofile" />
                    </div>
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show profile in directory</p>
                    <p className="text-sm text-muted-foreground">Allow other alumni to find you</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show email address</p>
                    <p className="text-sm text-muted-foreground">Display email on your profile</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show work information</p>
                    <p className="text-sm text-muted-foreground">Display current company and position</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Manage how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Job alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified about new job postings</p>
                  </div>
                  <Switch checked={jobAlerts} onCheckedChange={setJobAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Event reminders</p>
                    <p className="text-sm text-muted-foreground">Receive reminders for upcoming events</p>
                  </div>
                  <Switch checked={eventReminders} onCheckedChange={setEventReminders} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">News and announcements</p>
                    <p className="text-sm text-muted-foreground">Stay updated with latest news</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Connection requests</p>
                    <p className="text-sm text-muted-foreground">Get notified when alumni want to connect</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
