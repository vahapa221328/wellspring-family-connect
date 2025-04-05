
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus, Smile, Meh, Frown, FrownOpen } from "lucide-react";

export const QuickMoodCheck = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  const moods = [
    { value: 4, icon: SmilePlus, label: "Great", color: "bg-green-100 text-green-600" },
    { value: 3, icon: Smile, label: "Good", color: "bg-blue-100 text-blue-600" },
    { value: 2, icon: Meh, label: "Okay", color: "bg-yellow-100 text-yellow-600" },
    { value: 1, icon: Frown, label: "Low", color: "bg-orange-100 text-orange-600" },
    { value: 0, icon: FrownOpen, label: "Bad", color: "bg-red-100 text-red-600" },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">How is everyone today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  selectedMood === mood.value
                    ? `ring-2 ring-offset-2 ring-purple-500 ${mood.color}`
                    : "hover:bg-gray-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedMood === mood.value ? "" : mood.color
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs mt-1">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
