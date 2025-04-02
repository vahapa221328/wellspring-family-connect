
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Video } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  lastContact?: Date;
}

const familyMembers: FamilyMember[] = [
  { 
    id: '1', 
    name: 'Mom', 
    avatar: 'M', 
    lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  { 
    id: '2', 
    name: 'Dad', 
    avatar: 'D', 
    lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  { 
    id: '3', 
    name: 'Sister', 
    avatar: 'S', 
    lastContact: new Date() // Today
  }
];

const FamilyConnectWidget: React.FC = () => {
  // Function to determine if we should remind to contact someone
  const shouldRemind = (lastContact?: Date): boolean => {
    if (!lastContact) return true;
    const daysSinceContact = (Date.now() - lastContact.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceContact >= 2; // Remind if 2+ days
  };

  // Function to format last contact time
  const formatLastContact = (date?: Date): string => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Family Connect</CardTitle>
        <CardDescription>Keep in touch with your loved ones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {familyMembers.map(member => (
          <div 
            key={member.id} 
            className={`p-3 rounded-lg flex justify-between items-center ${
              shouldRemind(member.lastContact) 
                ? 'bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30' 
                : 'bg-muted'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                shouldRemind(member.lastContact) 
                  ? 'bg-amber-200 text-amber-800' 
                  : 'bg-brand-purple-light text-brand-purple'
              }`}>
                <span className="font-medium">{member.avatar}</span>
              </div>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">
                  Last contact: {formatLastContact(member.lastContact)}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-2">
          <span className="mr-2">+</span> Add Family Member
        </Button>
      </CardContent>
    </Card>
  );
};

export default FamilyConnectWidget;
