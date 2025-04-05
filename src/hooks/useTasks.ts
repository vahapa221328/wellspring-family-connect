
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { taskService } from '@/services/task.service';
import { Task } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

export function useTasks(familyId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(familyId);
      setTasks(data);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load tasks. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      const added = await taskService.createTask(task);
      setTasks((prev) => [...prev, added]);
      toast({
        title: 'Success',
        description: 'Task added successfully',
      });
      return added;
    } catch (err) {
      console.error('Error adding task:', err);
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (task: Partial<Task>) => {
    try {
      setLoading(true);
      const updated = await taskService.updateTask(task);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
      return updated;
    } catch (err) {
      console.error('Error updating task:', err);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (err) {
      console.error('Error deleting task:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      setLoading(true);
      const updated = await taskService.toggleTaskCompletion(taskId, completed);
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
      toast({
        title: 'Success',
        description: `Task marked as ${completed ? 'completed' : 'incomplete'}`,
      });
      return updated;
    } catch (err) {
      console.error('Error toggling task completion:', err);
      toast({
        title: 'Error',
        description: 'Failed to update task status',
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    if (!familyId) return;
    
    loadTasks();

    // Set up realtime subscription
    const subscription = supabase
      .channel('tasks-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `family_id=eq.${familyId}`,
      }, () => {
        // Reload tasks when changes occur
        loadTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [familyId]);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
}
