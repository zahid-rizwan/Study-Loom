import api from './api';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  studentId: string;
  program: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post('/login', credentials);
      console.log(response.data)
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
     console.log(error)
      throw error;
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      throw error;
    }
  },

  async updateProfile(userId: string, data: Partial<User>) {
    try {
      const response = await api.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
      throw error;
    }
  },

  async getProfile(userId: string) {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      // Temporary: Use dummy data if API is not available
    }
  },
};