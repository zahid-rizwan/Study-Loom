import api from './api';
import { Goal } from '../types';

export const goalsService = {
  async getGoals() {
    try {
      const response = await api.get('/goals');
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        return [];
      }
      throw error;
    }
  },

  async createGoal(goalData: Omit<Goal, 'id' | 'isCompleted'>) {
    try {
      const response = await api.post('/goals', goalData);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        return {
          id: crypto.randomUUID(),
          ...goalData,
          isCompleted: false,
        };
      }
      throw error;
    }
  },

  async toggleGoalCompletion(goalId: string) {
    try {
      const response = await api.put(`/goals/${goalId}/toggle`);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        return { success: true };
      }
      throw error;
    }
  },
};