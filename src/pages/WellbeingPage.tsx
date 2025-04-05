
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Heart, Calendar, SmilePlus, Smile, Meh, Frown, FrownOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WellbeingPage = () => {
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
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Heart className="h-4 w-4 mr-2" />
            Check-in Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div key={day} className="text-center">
                            <div className="text-xs text-gray-500 mb-2">{day}</div>
                            <div className={`h-16 rounded-lg border flex items-center justify-center ${
                              i === 0 ? 'bg-green-100 border-green-200' : 
                              i === 1 ? 'bg-blue-100 border-blue-200' : 
                              i === 2 ? 'bg-yellow-100 border-yellow-200' : 
                              i === 3 ? 'bg-orange-100 border-orange-200' : 
                              'bg-gray-50 border-gray-100'
                            }`}>
                              {i === 0 && <SmilePlus className="h-6 w-6 text-green-600" />}
                              {i === 1 && <Smile className="h-6 w-6 text-blue-600" />}
                              {i === 2 && <Meh className="h-6 w-6 text-yellow-600" />}
                              {i === 3 && <Frown className="h-6 w-6 text-orange-600" />}
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
                  
                  <div className="flex items-start p-3 rounded-lg bg-purple-50">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/public/lovable-uploads/7b99b8a2-99f7-429b-aee6-adcaace0744b.png" />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-sm">Taylor</h3>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">Today, 8:30 AM</span>
                        <div className="ml-2 bg-blue-100 p-1 rounded-full">
                          <Smile className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Good morning! Busy day ahead but in a positive mood.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg bg-purple-50">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-purple-200 text-purple-800">R</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-sm">Riley</h3>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-xs text-gray-500">Yesterday, 7:45 PM</span>
                        <div className="ml-2 bg-yellow-100 p-1 rounded-full">
                          <Meh className="h-4 w-4 text-yellow-600" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Math test was tough today, but I think I did okay.</p>
                    </div>
                  </div>
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
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/public/lovable-uploads/000c3c36-8517-4a1f-a882-1cf196368cb7.png" />
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Jordan</span>
                    </div>
                    <div className="bg-green-100 p-1 rounded-full">
                      <SmilePlus className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/public/lovable-uploads/7b99b8a2-99f7-429b-aee6-adcaace0744b.png" />
                        <AvatarFallback>T</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Taylor</span>
                    </div>
                    <div className="bg-blue-100 p-1 rounded-full">
                      <Smile className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-purple-200 text-purple-800">R</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Riley</span>
                    </div>
                    <div className="text-gray-400 text-sm">Not checked in</div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-purple-200 text-purple-800">C</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Casey</span>
                    </div>
                    <div className="text-gray-400 text-sm">Not checked in</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
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
