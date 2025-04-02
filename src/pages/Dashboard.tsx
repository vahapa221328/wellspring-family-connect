
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bell, Calendar, CheckCircle2, Circle, MessageCircle, PlusCircle, UserPlus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import WaterTracker from '@/components/widgets/WaterTracker';
import FamilyConnectWidget from '@/components/widgets/FamilyConnectWidget';
import WellnessAssistant from '@/components/widgets/WellnessAssistant';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's your wellness summary for today</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4/8</div>
              <div className="text-brand-blue">cups</div>
            </div>
            <Progress value={50} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">50% of daily goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Movement Breaks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3/6</div>
              <div className="text-brand-purple">breaks</div>
            </div>
            <Progress value={50} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">50% of daily goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Family Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2/3</div>
              <div className="text-brand-teal">check-ins</div>
            </div>
            <Progress value={66} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">66% of daily goal</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div>
          <WaterTracker />
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-teal" />
                  Today's Habits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <Circle className="h-5 w-5 text-brand-blue" />
                    <span>Morning meditation</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Mark done
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <Circle className="h-5 w-5 text-brand-purple" />
                    <span>Stretch break</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Mark done
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-3">
                    <Circle className="h-5 w-5 text-brand-teal" />
                    <span>Call family member</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Mark done
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Middle Column */}
        <div>
          <FamilyConnectWidget />
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-brand-blue" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Water Intake</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Break Reminders</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Family Check-ins</span>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Habit Completion</span>
                      <span className="text-sm text-muted-foreground">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:h-[calc(100%-1.5rem)]">
          <WellnessAssistant />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
