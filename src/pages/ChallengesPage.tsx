
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Heart, Plus, Search, Tag, Check, Clock, ThumbsUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ChallengesPage = () => {
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
            <h1 className="text-2xl font-bold text-gray-800">Family Challenges</h1>
            <p className="text-gray-600">Take on challenges together and earn rewards</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Challenges</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ChallengeCard 
                  title="Weekly Family Dinner" 
                  description="Share a meal together 3 times this week" 
                  progress={66}
                  progressText="2/3 completed"
                  reward={10}
                  daysLeft={2}
                  category="Social"
                  participants={4}
                />
                
                <ChallengeCard 
                  title="Trip Planning" 
                  description="Complete your vacation checklist" 
                  progress={45}
                  progressText="9/20 tasks"
                  reward={25}
                  daysLeft={10}
                  category="Planning"
                  participants={4}
                />
                
                <ChallengeCard 
                  title="Digital Detox" 
                  description="Spend 2 hours per day without screens" 
                  progress={30}
                  progressText="3/10 days"
                  reward={15}
                  daysLeft={7}
                  category="Wellbeing"
                  participants={3}
                />
              </div>
            </TabsContent>
            <TabsContent value="discover" className="mt-6">
              <div className="mb-4 flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Tag className="h-3.5 w-3.5 mr-1" />
                  All Categories
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Communication
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Quality Time
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Health
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Education
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Financial
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">30-Day Communication Boost</h3>
                        <div className="bg-white text-indigo-700 font-bold text-xs rounded-full h-6 w-6 flex items-center justify-center">
                          <span>20</span>
                        </div>
                      </div>
                      <p className="text-sm mt-2 opacity-90">Have a meaningful conversation every day for 30 days</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>30 days duration</span>
                        <span className="mx-2">•</span>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>432 families completed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Communication
                        </span>
                        <Button variant="outline" size="sm">
                          Start Challenge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white rounded-t-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Fitness Family</h3>
                        <div className="bg-white text-teal-700 font-bold text-xs rounded-full h-6 w-6 flex items-center justify-center">
                          <span>15</span>
                        </div>
                      </div>
                      <p className="text-sm mt-2 opacity-90">Exercise together 3 times per week for 4 weeks</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>28 days duration</span>
                        <span className="mx-2">•</span>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>254 families completed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Health
                        </span>
                        <Button variant="outline" size="sm">
                          Start Challenge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white rounded-t-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Gratitude Journey</h3>
                        <div className="bg-white text-orange-700 font-bold text-xs rounded-full h-6 w-6 flex items-center justify-center">
                          <span>10</span>
                        </div>
                      </div>
                      <p className="text-sm mt-2 opacity-90">Share one thing you're grateful for each day</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>14 days duration</span>
                        <span className="mx-2">•</span>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>589 families completed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          Wellbeing
                        </span>
                        <Button variant="outline" size="sm">
                          Start Challenge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 mb-4">
                  <Award className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No completed challenges yet</h3>
                <p className="text-gray-500 mb-6">Once you complete challenges, they'll appear here.</p>
                <Button variant="outline">
                  Start a Challenge
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ChallengeCard = ({ 
  title, 
  description, 
  progress, 
  progressText, 
  reward, 
  daysLeft, 
  category,
  participants
}: {
  title: string;
  description: string;
  progress: number;
  progressText: string;
  reward: number;
  daysLeft: number;
  category: string;
  participants: number;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            +{reward} XP
          </div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={progress} className="h-2 mb-1" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{progressText}</span>
            <span>{daysLeft} days left</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded mr-2">
              {category}
            </span>
            <div className="flex -space-x-2">
              {Array(participants).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs"
                >
                  {i === 0 ? 'J' : i === 1 ? 'T' : i === 2 ? 'R' : 'C'}
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 px-2">
            <Check className="h-3.5 w-3.5 mr-1" />
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengesPage;
