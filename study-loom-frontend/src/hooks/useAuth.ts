import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, LoginCredentials, RegisterData } from '../services/auth.service';
import { User } from '../types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      // const response=await axios.post('http://localhost:9090/login',credentials);
       const response = await authService.login(credentials);
      console.log("credentials:",credentials)
      console.log("response:",response)
      localStorage.setItem('token', response.jwtToken);
      dispatch(loginSuccess());
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/'); // Navigate to root which will redirect to dashboard
      // return user;
    } catch (err) {
      setError('Invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.register(data);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
      return user;
    } catch (err) {
      setError('Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  }, [navigate]);

  const updateProfile = useCallback(async (userId: string, data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await authService.updateProfile(userId, data);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    register,
    logout,
    updateProfile,
    loading,
    error,
  };
};