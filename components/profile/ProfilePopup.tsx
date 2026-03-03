import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Linkedin,
  Github,
  Twitter,
  X,
  User
} from 'lucide-react';

interface AlumniProfile {
  id: number;
  name: string;
  email: string;
  department?: string;
  graduationYear?: number;
  currentCompany?: string;
  currentPosition?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
  profileImage?: string;
}

interface ProfilePopupProps {
  profile: AlumniProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ profile, isOpen, onClose }) => {
  if (!profile) return null;

  const formatSkills = (skills: string[] | undefined) => {
    if (!skills || skills.length === 0) return [];
    return skills;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 pb-3 border-b">
          <DialogTitle className="text-xl font-bold text-center">Alumni Profile</DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              {profile.profileImage ? (
                <div className="h-24 w-24 rounded-full border-3 border-background shadow-lg overflow-hidden flex-shrink-0">
                  <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-3xl border-3 border-background shadow-lg">
                  {profile.name.charAt(0)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 border-3 border-background flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <p className="text-lg text-muted-foreground mb-1">
                {profile.currentPosition || 'Alumni'}
              </p>
              {profile.currentCompany && (
                <p className="text-base text-muted-foreground">at {profile.currentCompany}</p>
              )}
            </div>
          </div>

          {/* Contact & Education Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Information */}
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              <h3 className="text-base font-semibold flex items-center gap-2 text-primary">
                <Mail className="h-4 w-4" />
                Contact
              </h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="break-all text-xs">{profile.email}</span>
                </div>
                {profile.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Education & Career */}
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              <h3 className="text-base font-semibold flex items-center gap-2 text-primary">
                <User className="h-4 w-4" />
                Education & Career
              </h3>
              <div className="space-y-1">
                {profile.department && (
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Department</span>
                    <span>{profile.department}</span>
                  </div>
                )}
                {profile.graduationYear && (
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Graduation</span>
                    <span>{profile.graduationYear}</span>
                  </div>
                )}
                {profile.currentCompany && (
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Company</span>
                    <span className="truncate ml-2">{profile.currentCompany}</span>
                  </div>
                )}
                {profile.currentPosition && (
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Position</span>
                    <span className="truncate ml-2">{profile.currentPosition}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              <h3 className="text-base font-semibold text-primary">About</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Skills and Social Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <h3 className="text-base font-semibold text-primary">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {formatSkills(profile.skills).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {(profile.linkedin || profile.github || profile.twitter) && (
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <h3 className="text-base font-semibold text-primary">Social Links</h3>
                <div className="space-y-1">
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                    >
                      <Linkedin className="h-3 w-3" />
                      LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800 transition-colors p-1 rounded hover:bg-gray-50"
                    >
                      <Github className="h-3 w-3" />
                      GitHub
                    </a>
                  )}
                  {profile.twitter && (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
                    >
                      <Twitter className="h-3 w-3" />
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePopup;
