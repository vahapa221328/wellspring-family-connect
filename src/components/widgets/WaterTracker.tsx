
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, MinusCircle, PlusCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WaterTrackerProps {
  goalCups?: number;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ goalCups = 8 }) => {
  const [cups, setCups] = useState(4);

  const handleAddCup = () => {
    if (cups < goalCups) {
      setCups(cups + 1);
    }
  };

  const handleRemoveCup = () => {
    if (cups > 0) {
      setCups(cups - 1);
    }
  };

  const progressPercentage = (cups / goalCups) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-brand-blue-light">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-brand-blue flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Water Intake
            </CardTitle>
            <CardDescription>Track your daily hydration</CardDescription>
          </div>
          <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-sm">
            <Droplets className="h-6 w-6 text-brand-blue" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-brand-blue">
            {cups} <span className="text-lg text-muted-foreground">/ {goalCups}</span>
          </div>
          <p className="text-muted-foreground">cups of water</p>
        </div>

        <Progress value={progressPercentage} className="h-2 mb-4" />

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {cups === goalCups ? 
              "Goal achieved! 🎉" : 
              `${goalCups - cups} more to reach your goal`
            }
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRemoveCup}
              disabled={cups === 0}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={handleAddCup}
              disabled={cups === goalCups}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterTracker;
