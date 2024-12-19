import api from './api';
import { StudySession } from '../types';

export const studySessionService = {
  async getStudySessions() {
    try {
      // const response = await api.get('/study-sessions');
      // return response.data;
      return [
        {
          id: '1',
          subjectId: 's1',
          startTime: '2024-03-10T14:00:00',
          endTime: '2024-03-10T16:00:00',
          duration: 120,
          notes: 'Studied Data Structures - Arrays and Linked Lists',
          materials: ['study_material_1.pdf']
        },
        {
          id: '2',
          subjectId: 's2',
          startTime: '2024-03-11T09:00:00',
          endTime: '2024-03-11T11:30:00',
          duration: 150,
          notes: 'Operating Systems - Process Management',
          materials: []
        }
      ];
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      if (import.meta.env.VITE_DEVELOPMENT === 'development') {
        return [
          {
            id: '1',
            subjectId: 's1',
            startTime: '2024-03-10T14:00:00',
            endTime: '2024-03-10T16:00:00',
            duration: 120,
            notes: 'Studied Data Structures - Arrays and Linked Lists',
            materials: ['study_material_1.pdf']
          },
          {
            id: '2',
            subjectId: 's2',
            startTime: '2024-03-11T09:00:00',
            endTime: '2024-03-11T11:30:00',
            duration: 150,
            notes: 'Operating Systems - Process Management',
            materials: []
          }
        ];
      }
      throw error;
    }
  },

  async startStudySession(subjectId: string) {
    try {
      const response = await api.post('/study-sessions/start', { subjectId });
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        return {
          id: crypto.randomUUID(),
          subjectId,
          startTime: new Date().toISOString(),
          endTime: null,
          duration: null,
          notes: '',
          materials: []
        };
      }
      throw error;
    }
  },

  async endStudySession(sessionId: string, notes: string, file?: File | null) {
    try {
      const formData = new FormData();
      formData.append('notes', notes);
      if (file) {
        formData.append('material', file);
      }

      const response = await api.put(`/study-sessions/${sessionId}/end`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        const endTime = new Date();
        const startTime = new Date(endTime.getTime() - 7200000); // 2 hours ago
        return {
          id: sessionId,
          endTime: endTime.toISOString(),
          duration: 120,
          notes,
          materials: file ? [file.name] : []
        };
      }
      throw error;
    }
  },

  async addManualSession(subjectId: string, data: { 
    date: string; 
    duration: number; 
    notes: string;
    file?: File | null;
  }) {
    try {
      const formData = new FormData();
      formData.append('date', data.date);
      formData.append('duration', data.duration.toString());
      formData.append('notes', data.notes);
      if (data.file) {
        formData.append('material', data.file);
      }

      const response = await api.post('/study-sessions/manual', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        return {
          id: crypto.randomUUID(),
          subjectId,
          startTime: new Date(data.date).toISOString(),
          endTime: new Date(data.date).toISOString(),
          duration: data.duration,
          notes: data.notes,
          materials: data.file ? [data.file.name] : []
        };
      }
      throw error;
    }
  }
};