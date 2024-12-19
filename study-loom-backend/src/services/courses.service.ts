import api from './api';
import { Course, Subject, Chapter, Topic } from '../types';
import { initialCourses } from '../data/initialCourses';

export const coursesService = {
  async getCourses() {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        return initialCourses;
      }
      throw error;
    }
  },

  async getCourseById(courseId: string) {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        return initialCourses.find(course => course.id === courseId);
      }
      throw error;
    }
  },

  async createCourse(courseData: Omit<Course, 'id'>) {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        const newCourse = {
          id: crypto.randomUUID(),
          ...courseData,
        };
        initialCourses.push(newCourse);
        return newCourse;
      }
      throw error;
    }
  },

  async updateCourseProgress(courseId: string, subjectId: string, chapterId: string, topicId: string) {
    try {
      const response = await api.put(`/courses/${courseId}/progress`, {
        subjectId,
        chapterId,
        topicId,
      });
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (process.env.NODE_ENV === 'development') {
        const course = initialCourses.find(c => c.id === courseId);
        if (course) {
          const subject = course.subjects.find(s => s.id === subjectId);
          if (subject) {
            const chapter = subject.chapters.find(ch => ch.id === chapterId);
            if (chapter) {
              const topic = chapter.topics.find(t => t.id === topicId);
              if (topic) {
                topic.isCompleted = !topic.isCompleted;
                // Recalculate subject progress
                const totalTopics = subject.chapters.reduce(
                  (acc, ch) => acc + ch.topics.length,
                  0
                );
                const completedTopics = subject.chapters.reduce(
                  (acc, ch) => acc + ch.topics.filter(t => t.isCompleted).length,
                  0
                );
                subject.progress = Math.round((completedTopics / totalTopics) * 100);
              }
            }
          }
        }
        return course;
      }
      throw error;
    }
  },
};