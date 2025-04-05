
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus, Smile, Meh, Frown, AlertCircle } from "lucide-react";

interface MoodData {
  day: string;
  value: number | null;
  hasMood: boolean;
}

interface MoodChartProps {
  data: MoodData[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  // Get mood icon by value
  const getMoodIcon = (value: number | null) => {
    if (value === null) return null;
    
    switch (Math.round(value)) {
      case 4: return <SmilePlus className="h-6 w-6 text-green-600" />;
      case 3: return <Smile className="h-6 w-6 text-blue-600" />;
      case 2: return <Meh className="h-6 w-6 text-yellow-600" />;
      case 1: return <Frown className="h-6 w-6 text-orange-600" />;
      case 0: return <AlertCircle className="h-6 w-6 text-red-600" />;
      default: return null;
    }
  };

  // Get mood background color by value
  const getMoodBgColor = (value: number | null) => {
    if (value === null) return "bg-gray-50 border-gray-100";
    
    switch (Math.round(value)) {
      case 4: return "bg-green-100 border-green-200";
      case 3: return "bg-blue-100 border-blue-200";
      case 2: return "bg-yellow-100 border-yellow-200";
      case 1: return "bg-orange-100 border-orange-200";
      case 0: return "bg-red-100 border-red-200";
      default: return "bg-gray-50 border-gray-100";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-7 gap-2">
            {data.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-gray-500 mb-2">{day.day.slice(0, 3)}</div>
                <div className={`h-16 rounded-lg border flex items-center justify-center ${
                  day.hasMood ? getMoodBgColor(day.value) : 'bg-gray-50 border-gray-100'
                }`}>
                  {day.hasMood && getMoodIcon(day.value)}
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
      </CardContent>
    </Card>
  );
};
