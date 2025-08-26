import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]); // Initialize as empty array instead of undefined
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get('/tasks');
      setTasks(Array.isArray(data) ? data : []); // Ensure it's always an array
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch tasks';
      setError(errorMessage);
      console.error('Error fetching tasks:', err);
      
      // Check if it's a network error
      if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
        setError('Unable to connect to server. Please make sure the backend is running on http://localhost:5000');
      }
      
      // Keep tasks as empty array on error
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await api.post('/tasks', taskData);
      setTasks(prev => [newTask, ...(prev || [])]);
      return newTask;
    } catch (err) {
      const errorMessage = err.message || 'Failed to create task';
      setError(errorMessage);
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (taskId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await api.put(`/tasks/${taskId}`, updates);
      setTasks(prev => (prev || []).map(task => 
        task._id === taskId ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      const errorMessage = err.message || 'Failed to update task';
      setError(errorMessage);
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => (prev || []).filter(task => task._id !== taskId));
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete task';
      setError(errorMessage);
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};