import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Settings, Globe, Mail, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SystemSettingsModule = () => {
    const { toast } = useToast();
    const [platform, setPlatform] = useState({ name: 'Adhiyamaan Connects', url: 'https://adhiyamaan.edu', email: 'admin@adhiyamaan.edu', maintenanceMode: false, registrationOpen: true, emailNotifications: true });

    const save = () => toast({ title: 'Settings saved', description: 'Platform configuration updated successfully' });

    const Field = ({ label, id, value, onChange, type = 'text' }: any) => (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
            <Input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} className="h-9" />
        </div>
    );

    const Toggle = ({ label, desc, value, onChange }: any) => (
        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
            <Switch checked={value} onCheckedChange={onChange} />
        </div>
    );

    return (
        <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">System Settings</h2>
                <p className="text-slate-500 text-sm mt-1">Configure platform-wide settings and integrations</p></div>

            <Tabs defaultValue="platform">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full justify-start gap-1">
                    <TabsTrigger value="platform" className="rounded-lg gap-2"><Settings className="h-3.5 w-3.5" />Platform</TabsTrigger>
                    <TabsTrigger value="social" className="rounded-lg gap-2"><Globe className="h-3.5 w-3.5" />Social Media</TabsTrigger>
                    <TabsTrigger value="email" className="rounded-lg gap-2"><Mail className="h-3.5 w-3.5" />Email</TabsTrigger>
                </TabsList>

                <TabsContent value="platform" className="mt-4 space-y-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader><CardTitle className="text-sm font-semibold">General Configuration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="Platform Name" id="name" value={platform.name} onChange={(v: string) => setPlatform(p => ({ ...p, name: v }))} />
                            <Field label="Platform URL" id="url" value={platform.url} onChange={(v: string) => setPlatform(p => ({ ...p, url: v }))} />
                            <Field label="Admin Email" id="email" value={platform.email} onChange={(v: string) => setPlatform(p => ({ ...p, email: v }))} />
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardHeader><CardTitle className="text-sm font-semibold">Feature Flags</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <Toggle label="Maintenance Mode" desc="Show maintenance page to all non-admin users" value={platform.maintenanceMode} onChange={(v: boolean) => setPlatform(p => ({ ...p, maintenanceMode: v }))} />
                            <Toggle label="Open Registration" desc="Allow new alumni to register" value={platform.registrationOpen} onChange={(v: boolean) => setPlatform(p => ({ ...p, registrationOpen: v }))} />
                            <Toggle label="Email Notifications" desc="Enable system email notifications" value={platform.emailNotifications} onChange={(v: boolean) => setPlatform(p => ({ ...p, emailNotifications: v }))} />
                        </CardContent>
                    </Card>
                    <Button onClick={save} className="gap-2"><Save className="h-4 w-4" />Save Settings</Button>
                </TabsContent>

                <TabsContent value="social" className="mt-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader><CardTitle className="text-sm font-semibold">Social Media Configuration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="LinkedIn API Key" id="li" value="" onChange={() => { }} />
                            <Field label="Instagram Access Token" id="ig" value="" onChange={() => { }} />
                            <Field label="YouTube API Key" id="yt" value="" onChange={() => { }} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email" className="mt-4">
                    <Card className="border-0 shadow-lg">
                        <CardHeader><CardTitle className="text-sm font-semibold">Email Configuration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Field label="SMTP Host" id="smtp" value="" onChange={() => { }} />
                            <Field label="SMTP Port" id="port" value="" onChange={() => { }} />
                            <Field label="SMTP Username" id="user" value="" onChange={() => { }} />
                            <Field label="SMTP Password" id="pass" type="password" value="" onChange={() => { }} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
