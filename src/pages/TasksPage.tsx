
import { FamilyNavigation } from "@/components/FamilyNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Heart, Plus, Search, Filter, CheckCircle, Circle } from "lucide-react";

const TasksPage = () => {
  const tasks = [
    { id: 1, title: "Plan weekly meals", category: "Household", assignedTo: "Jordan", priority: "High", completed: true, dueDate: "Today" },
    { id: 2, title: "Family game night", category: "Family", assignedTo: "Everyone", priority: "Medium", completed: false, dueDate: "Tomorrow" },
    { id: 3, title: "Schedule doctor appointment", category: "Health", assignedTo: "Taylor", priority: "High", completed: false, dueDate: "This week" },
    { id: 4, title: "Review vacation budget", category: "Planning", assignedTo: "Jordan & Taylor", priority: "Medium", completed: false, dueDate: "This week" },
    { id: 5, title: "Grocery shopping", category: "Household", assignedTo: "Jordan", priority: "High", completed: false, dueDate: "Tomorrow" },
    { id: 6, title: "Help with homework", category: "Education", assignedTo: "Taylor", priority: "Medium", completed: false, dueDate: "Today" },
    { id: 7, title: "Fix leaky faucet", category: "Home Maintenance", assignedTo: "Jordan", priority: "Low", completed: false, dueDate: "This week" },
    { id: 8, title: "Plan weekend outing", category: "Family", assignedTo: "Everyone", priority: "Medium", completed: false, dueDate: "Friday" },
  ];

  const categoryCounts = {
    All: tasks.length,
    Household: tasks.filter(t => t.category === "Household").length,
    Family: tasks.filter(t => t.category === "Family").length,
    Health: tasks.filter(t => t.category === "Health").length,
    Planning: tasks.filter(t => t.category === "Planning").length,
    Education: tasks.filter(t => t.category === "Education").length,
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
            <h1 className="text-2xl font-bold text-gray-800">Family Tasks</h1>
            <p className="text-gray-600">Manage and track your family's shared tasks</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <div 
                      key={category} 
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                        category === 'All' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle className="text-xl">All Tasks</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search tasks..."
                        className="pl-8 h-9 md:w-60 lg:w-80"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="mine">My Tasks</TabsTrigger>
                    <TabsTrigger value="today">Due Today</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-3">
                    {tasks.map((task) => (
                      <div 
                        key={task.id} 
                        className={`flex items-center p-4 rounded-lg border ${
                          task.completed ? "bg-green-50 border-green-100" : "hover:bg-purple-50"
                        }`}
                      >
                        <div className="mr-3">
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                              {task.title}
                            </h3>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              task.priority === "High" 
                                ? "bg-red-100 text-red-800" 
                                : task.priority === "Medium" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                              {task.category}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded flex items-center">
                              <span className="mr-1">🗓️</span> {task.dueDate}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded flex items-center">
                              <span className="mr-1">👤</span> {task.assignedTo}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="mine">
                    <div className="text-center py-8 text-gray-500">
                      <p>Tasks assigned to you will appear here.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="today">
                    <div className="text-center py-8 text-gray-500">
                      <p>Tasks due today will appear here.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="text-center py-8 text-gray-500">
                      <p>Completed tasks will appear here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
