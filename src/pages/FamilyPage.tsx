
import { useState } from "react";
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Crown, Award, Plus, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FamilyPage = () => {
  const [familyMembers] = useState([
    { id: 1, name: "Jordan Jackson", role: "Parent", level: 6, avatarSrc: "/public/lovable-uploads/000c3c36-8517-4a1f-a882-1cf196368cb7.png" },
    { id: 2, name: "Taylor Jackson", role: "Parent", level: 5, avatarSrc: "/public/lovable-uploads/7b99b8a2-99f7-429b-aee6-adcaace0744b.png" },
    { id: 3, name: "Riley Jackson", role: "Child", level: 3, avatarSrc: "" },
    { id: 4, name: "Casey Jackson", role: "Child", level: 2, avatarSrc: "" },
  ]);

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
            <h1 className="text-2xl font-bold text-gray-800">The Jackson Family</h1>
            <p className="text-gray-600">Managing your family's well-being together</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Family Members
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-14 w-14">
                          {member.avatarSrc ? (
                            <AvatarImage src={member.avatarSrc} />
                          ) : (
                            <AvatarFallback className="bg-purple-100 text-purple-800 text-lg">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{member.name}</h3>
                            {member.id === 1 && (
                              <Crown className="h-4 w-4 text-yellow-500 ml-1" />
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{member.role}</span>
                            <span className="mx-1">•</span>
                            <span>Lvl {member.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress to next level</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-1.5" />
                      </div>
                      <div className="mt-3 flex justify-between">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Tasks</div>
                          <div className="font-medium">12</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Streak</div>
                          <div className="font-medium">7d</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Rewards</div>
                          <div className="font-medium">3</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Stats</CardTitle>
                <CardDescription>Track how you're doing as a family</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Celebrate your family's success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 rounded-lg bg-green-50">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Weekly Dinner Streak</h3>
                      <p className="text-sm text-gray-600">Completed 3 family dinners for 4 weeks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-blue-50">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Financial Planners</h3>
                      <p className="text-sm text-gray-600">Set up vacation savings goal together</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 rounded-lg bg-purple-50">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Communication Heroes</h3>
                      <p className="text-sm text-gray-600">Had meaningful check-ins 5 days in a row</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyPage;
