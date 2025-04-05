
import { useState, useEffect } from "react";
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Heart, Calendar, SmilePlus, Smile, Meh, Frown, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickMoodCheck } from "@/components/QuickMoodCheck";
import { useFamilyContext } from "@/context/FamilyContext";
import { useMood } from "@/hooks/useMood";
import { useToast } from "@/hooks/use-toast";

const WellbeingPage = () => {
  const { family, members, loading: familyLoading } = useFamilyContext();
  const [selectedMember, setSelectedMember] = useState<string | undefined>();
  const { moods, recentMoods, loading: moodsLoading, loadRecentMoods, getWeeklyMoodData } = useMood(selectedMember);
  const { toast } = useToast();
  const [weeklyMoodData, setWeeklyMoodData] = useState<any[]>([]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get mood icon by value
  const getMoodIcon = (value: number) => {
    switch (value) {
      case 4: return <SmilePlus className="h-4 w-4 text-green-600" />;
      case 3: return <Smile className="h-4 w-4 text-blue-600" />;
      case 2: return <Meh className="h-4 w-4 text-yellow-600" />;
      case 1: return <Frown className="h-4 w-4 text-orange-600" />;
      case 0: return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  // Get mood background color by value
  const getMoodBgColor = (value: number) => {
    switch (value) {
      case 4: return "bg-green-100";
      case 3: return "bg-blue-100";
      case 2: return "bg-yellow-100";
      case 1: return "bg-orange-100";
      case 0: return "bg-red-100";
      default: return "bg-gray-50";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + 
           date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Load weekly mood data when member changes
  useEffect(() => {
    if (selectedMember) {
      const weeklyData = getWeeklyMoodData();
      setWeeklyMoodData(weeklyData);
    }
  }, [selectedMember, moods]);

  // Load recent moods when family changes
  useEffect(() => {
    if (family?.id) {
      loadRecentMoods();
    }
  }, [family?.id]);

  // Set the first member as selected by default
  useEffect(() => {
    if (members.length > 0 && !selectedMember) {
      setSelectedMember(members[0].id);
    }
  }, [members]);

  const handleMemberSelect = (memberId: string) => {
    setSelectedMember(memberId);
  };

  const sendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: "Check-in reminder has been sent to family members."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
      {/* Header with Navigation */}
      <div className="bg-purple-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/public/lovable-uploads/bb92a12a-903b-4294-b05d-81b783c1576f.png"
                alt="Wellspring Family"
                className="h-10 w-10"
              />
              <h1 className="font-bold text-xl">Wellspring</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-purple-700 px-3 py-1 rounded-full flex items-center">
                  <Heart className="h-4 w-4 text-red-400 mr-1" />
                  <span className="text-sm font-medium">47/50</span>
                </div>
                <div className="bg-purple-700 px-3 py-1 rounded-full flex items-center">
                  <Award className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">6/25</span>
                </div>
              </div>
              <Avatar>
                <AvatarImage src="/public/lovable-uploads/000c3c36-8517-4a1f-a882-1cf196368cb7.png" alt="Avatar" />
                <AvatarFallback>FW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <FamilyNavigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Family Wellbeing</h1>
            <p className="text-gray-600">Track and improve your family's emotional health</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setSelectedMember(members[0]?.id)}>
            <Heart className="h-4 w-4 mr-2" />
            Check-in Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Current member mood check */}
            {selectedMember && (
              <QuickMoodCheck memberId={selectedMember} />
            )}
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mood Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <TabsList className="mb-4">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weekly">
                    <div className="space-y-6">
                      <div className="grid grid-cols-7 gap-2">
                        {weeklyMoodData.map((day, i) => (
                          <div key={day.day} className="text-center">
                            <div className="text-xs text-gray-500 mb-2">{day.day.slice(0, 3)}</div>
                            <div className={`h-16 rounded-lg border flex items-center justify-center ${
                              day.hasMood 
                                ? getMoodBgColor(Math.round(day.value)) 
                                : 'bg-gray-50 border-gray-100'
                            }`}>
                              {day.hasMood && getMoodIcon(Math.round(day.value))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-center space-x-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Great</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Good</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Okay</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Low</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                          <span className="text-xs text-gray-600">Bad</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="monthly">
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>Monthly mood data will appear here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Relationship Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Communication</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Quality Time</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Support</span>
                        <span>91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Shared Goals</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Insights</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• Your family's communication has improved by 12% this month!</p>
                      <p>• Quality time is strong, keep up the good work.</p>
                      <p>• Consider setting more shared goals together.</p>
                    </div>
                    <Button variant="link" className="text-sm text-purple-600 p-0 mt-2">
                      View Detailed Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Show actual recent moods or a placeholder if none exist */}
                  {recentMoods.length > 0 ? (
                    recentMoods.slice(0, 3).map((mood) => (
                      <div key={mood.id} className="flex items-start p-3 rounded-lg bg-purple-50">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={mood.member_avatar_url} />
                          <AvatarFallback>{getInitials(mood.member_name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-medium text-sm">{mood.member_name}</h3>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{formatDate(mood.date)}</span>
                            <div className={`ml-2 ${getMoodBgColor(mood.mood_value)} p-1 rounded-full`}>
                              {getMoodIcon(mood.mood_value)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{mood.note || "No note added for this check-in."}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Example entry if no real data
                    <div className="flex items-start p-3 rounded-lg bg-purple-50">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/public/lovable-uploads/000c3c36-8517-4a1f-a882-1cf196368cb7.png" />
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium text-sm">Jordan</h3>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-xs text-gray-500">Today, 9:15 AM</span>
                          <div className="ml-2 bg-green-100 p-1 rounded-full">
                            <SmilePlus className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Feeling great today! Looking forward to our movie night.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Check-in</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">How is everyone feeling today?</p>
                
                <div className="space-y-3">
                  {members.map((member) => {
                    // Find most recent mood for this member
                    const memberRecentMood = recentMoods.find(mood => mood.member_id === member.id);
                    const hasCheckedIn = !!memberRecentMood && 
                      new Date(memberRecentMood.date).toDateString() === new Date().toDateString();
                    
                    return (
                      <div key={member.id} className="flex items-center justify-between pb-2 border-b">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar_url} />
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                        </div>
                        {hasCheckedIn ? (
                          <div className={`${getMoodBgColor(memberRecentMood.mood_value)} p-1 rounded-full`}>
                            {getMoodIcon(memberRecentMood.mood_value)}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">Not checked in</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <Button variant="outline" className="w-full mt-4" onClick={sendReminder}>
                  Send Check-in Reminder
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Wellbeing Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="goal1" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="goal1" className="text-sm">Family dinner 3x per week</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="goal2" className="h-4 w-4 text-purple-600 rounded mr-3" checked />
                    <label htmlFor="goal2" className="text-sm line-through text-gray-500">Weekly game night</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="goal3" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="goal3" className="text-sm">Reduce screen time by 20%</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="goal4" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="goal4" className="text-sm">Regular check-ins with each family member</label>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Set New Goal
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Family Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Suggested for your family's wellbeing:</p>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 hover:bg-purple-50 transition cursor-pointer">
                    <h3 className="font-medium text-sm">Nature Walk</h3>
                    <p className="text-xs text-gray-600">Boost mood and get exercise together</p>
                  </div>
                  
                  <div className="border rounded-lg p-3 hover:bg-purple-50 transition cursor-pointer">
                    <h3 className="font-medium text-sm">Gratitude Circle</h3>
                    <p className="text-xs text-gray-600">Share things you're thankful for</p>
                  </div>
                  
                  <div className="border rounded-lg p-3 hover:bg-purple-50 transition cursor-pointer">
                    <h3 className="font-medium text-sm">Family Cooking</h3>
                    <p className="text-xs text-gray-600">Prepare a meal together</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" size="sm" className="text-purple-600">
                    View More Activities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellbeingPage;
