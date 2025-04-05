
import { Link } from "react-router-dom";
import { Heart, Calendar, LucideHome, Users, Award, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { TaskList } from "@/components/TaskList";
import { QuickMoodCheck } from "@/components/QuickMoodCheck";

const Index = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex justify-between items-center">
                  <span>The Jackson Family</span>
                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Level 1</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="bg-indigo-100 w-32 h-32 flex items-center justify-center rounded-lg mb-3">
                      <img 
                        src="/public/lovable-uploads/ba49412f-5401-4238-af2b-fb6bb3b13a54.png" 
                        alt="Family Avatar" 
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full mt-3 space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Relationship XP</span>
                        <span>47/50</span>
                      </div>
                      <Progress value={94} className="h-2 bg-purple-100" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Weekly Goals</span>
                        <span>6/25</span>
                      </div>
                      <Progress value={24} className="h-2 bg-yellow-100" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <QuickMoodCheck />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Beach Vacation</h3>
                    <Map className="h-5 w-5" />
                  </div>
                  <p className="text-sm opacity-90 mb-2">Planning phase: 45% complete</p>
                  <Progress value={45} className="h-1.5 bg-white/20" />
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs">July 15-22</span>
                    <Button size="sm" variant="secondary" className="h-7 text-xs">Plan Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Tasks */}
          <div>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Family Tasks</CardTitle>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TaskList />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Challenges & Rewards */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Family Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active">
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3 hover:bg-purple-50 transition cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Weekly Family Dinner</h3>
                            <p className="text-sm text-gray-600">Share a meal together 3 times this week</p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            +10 XP
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={66} className="h-1.5" />
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>2/3 completed</span>
                            <span>Due in 2 days</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3 hover:bg-purple-50 transition cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Trip Planning</h3>
                            <p className="text-sm text-gray-600">Complete your vacation checklist</p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            +25 XP
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={45} className="h-1.5" />
                          <div className="flex justify-between mt-1 text-xs text-gray-500">
                            <span>9/20 tasks</span>
                            <span>Due in 10 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="text-center py-6 text-gray-500">
                      <p>No completed challenges yet</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-4 flex justify-center">
                  <Link to="/challenges">
                    <Button variant="outline" size="sm">View All Challenges</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3 text-center hover:bg-amber-50 transition cursor-pointer">
                    <div className="bg-amber-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-medium text-sm">Movie Night</h3>
                    <p className="text-xs text-gray-600 mt-1">Cost: 50 XP</p>
                  </div>
                  
                  <div className="border rounded-lg p-3 text-center hover:bg-amber-50 transition cursor-pointer">
                    <div className="bg-amber-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Map className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-medium text-sm">Day Trip</h3>
                    <p className="text-xs text-gray-600 mt-1">Cost: 100 XP</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Link to="/rewards">
                    <Button variant="outline" size="sm">View All Rewards</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
