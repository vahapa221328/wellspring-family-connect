
import { CheckCircle, Circle, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const TaskList = () => {
  const tasks = [
    { id: 1, title: "Plan weekly meals", category: "Daily", completed: true, dueDate: "Today" },
    { id: 2, title: "Family game night", category: "Social", completed: false, dueDate: "Tomorrow" },
    { id: 3, title: "Schedule doctor appointment", category: "Health", completed: false, dueDate: "This week" },
    { id: 4, title: "Review vacation budget", category: "Planning", completed: false, dueDate: "This week" },
    { id: 5, title: "Grocery shopping", category: "Daily", completed: false, dueDate: "Tomorrow" },
  ];

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`flex items-center p-3 rounded-lg border ${
            task.completed ? "bg-green-50 border-green-100" : "hover:bg-purple-50"
          }`}
        >
          <Checkbox 
            id={`task-${task.id}`} 
            checked={task.completed}
            className="h-5 w-5 text-purple-600 rounded-full"
          />
          <div className="ml-3 flex-1">
            <label 
              htmlFor={`task-${task.id}`}
              className={`font-medium cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </label>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                {task.category}
              </span>
              <div className="flex items-center ml-3 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>
          <div className="ml-2">
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300" />
            )}
          </div>
        </div>
      ))}
      
      <div className="flex justify-center mt-4">
        <button className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
          View all tasks
        </button>
      </div>
    </div>
  );
};
