
import { supabase, Task } from '@/lib/supabase';

export const taskService = {
  // Get tasks for a family
  async getTasks(familyId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('family_id', familyId)
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return data as Task[];
  },

  // Get tasks by category
  async getTasksByCategory(familyId: string, category: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('family_id', familyId)
      .eq('category', category)
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return data as Task[];
  },

  // Get tasks by assignee
  async getTasksByAssignee(familyId: string, assignedTo: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('family_id', familyId)
      .eq('assigned_to', assignedTo)
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return data as Task[];
  },

  // Create a task
  async createTask(task: Omit<Task, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  // Update a task
  async updateTask(task: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  },

  // Delete a task
  async deleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);
    
    if (error) throw error;
    return true;
  },

  // Toggle task completion
  async toggleTaskCompletion(taskId: string, completed: boolean) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', taskId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Task;
  }
};
