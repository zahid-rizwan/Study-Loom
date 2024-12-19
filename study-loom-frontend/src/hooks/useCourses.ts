import { useState, useCallback } from 'react';
import { coursesService } from '../services/courses.service';
import { Course } from '../types';

export const useCourses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await coursesService.getCourses();
    } catch (err) {
      setError('Failed to fetch courses');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCourseById = useCallback(async (courseId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await coursesService.getCourseById(courseId);
    } catch (err) {
      setError('Failed to fetch course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (courseData: Omit<Course, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      return await coursesService.createCourse(courseData);
    } catch (err) {
      setError('Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (courseId: string, subjectId: string, chapterId: string, topicId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await coursesService.updateCourseProgress(courseId, subjectId, chapterId, topicId);
    } catch (err) {
      setError('Failed to update progress');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getCourses,
    getCourseById,
    createCourse,
    updateProgress,
    loading,
    error,
  };
};