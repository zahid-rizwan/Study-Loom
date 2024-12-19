import { useState, useCallback } from 'react';
import { goalsService } from '../services/goals.service';
import { Goal } from '../types';

export const useGoals = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await goalsService.getGoals();
    } catch (err) {
      setError('Failed to fetch goals');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createGoal = useCallback(async (goalData: Omit<Goal, 'id' | 'isCompleted'>) => {
    try {
      setLoading(true);
      setError(null);
      return await goalsService.createGoal(goalData);
    } catch (err) {
      setError('Failed to create goal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleGoalCompletion = useCallback(async (goalId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await goalsService.toggleGoalCompletion(goalId);
    } catch (err) {
      setError('Failed to update goal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getGoals,
    createGoal,
    toggleGoalCompletion,
    loading,
    error,
  };
};