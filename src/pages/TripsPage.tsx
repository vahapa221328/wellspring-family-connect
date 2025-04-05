
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Heart, Plus, Map, Calendar, DollarSign, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TripsPage = () => {
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
            <h1 className="text-2xl font-bold text-gray-800">Family Trips</h1>
            <p className="text-gray-600">Plan and track your family adventures</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            New Trip
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="planning">Planning</TabsTrigger>
                <TabsTrigger value="past">Past Trips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg relative">
                        <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="text-xl font-bold">Beach Vacation</h2>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>July 15-22, 2025</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            <Map className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-sm">Miami, Florida</span>
                          </div>
                          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-sm">Budget: $2,500</span>
                          </div>
                          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            <Users className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-sm">4 travelers</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Planning progress</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">32 days until departure</span>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="planning">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-0">
                      <div className="h-40 bg-gradient-to-r from-amber-400 to-orange-500 rounded-t-lg relative">
                        <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="text-xl font-bold">Mountain Cabin Getaway</h2>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>October 5-9, 2025</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            <Map className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-sm">Asheville, NC</span>
                          </div>
                          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-sm">Budget: $1,200</span>
                          </div>
                          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            <Users className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-sm">4 travelers</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Planning progress</span>
                            <span>15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Early planning stage</span>
                          <Button variant="outline" size="sm">Continue Planning</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 mb-4">
                    <Map className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No past trips yet</h3>
                  <p className="text-gray-500 mb-6">Your completed trips will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trip Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-700">$850</div>
                  <div className="text-sm text-gray-600">of $2,500 goal</div>
                </div>
                
                <div className="mb-4">
                  <Progress value={34} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$2,500</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Last deposit</span>
                    <span className="font-medium">$100 on Apr 1</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Monthly goal</span>
                    <span className="font-medium">$250/month</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Remaining</span>
                    <span className="font-medium">$1,650</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4">Add to Savings</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trip Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="check1" className="h-4 w-4 text-purple-600 rounded mr-3" checked />
                    <label htmlFor="check1" className="text-sm line-through text-gray-500">Research destination</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="check2" className="h-4 w-4 text-purple-600 rounded mr-3" checked />
                    <label htmlFor="check2" className="text-sm line-through text-gray-500">Set budget</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="check3" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="check3" className="text-sm">Book accommodations</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="check4" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="check4" className="text-sm">Book flights</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="check5" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="check5" className="text-sm">Plan activities</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="check6" className="h-4 w-4 text-purple-600 rounded mr-3" />
                    <label htmlFor="check6" className="text-sm">Create packing list</label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trip Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden border">
                    <div className="h-24 bg-gray-200"></div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm">National Park Trip</h3>
                      <p className="text-xs text-gray-600">Est. $1,800 for 5 days</p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden border">
                    <div className="h-24 bg-gray-200"></div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm">Theme Park Adventure</h3>
                      <p className="text-xs text-gray-600">Est. $3,200 for 7 days</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" size="sm" className="text-purple-600">
                    Browse More Ideas
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

export default TripsPage;
