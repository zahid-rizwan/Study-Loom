import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, Phone, School } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    studentId: '',
    program: '',
  });
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Prevent default called");
    console.log("formData:", formData);
  
    try {
      if (isLogin) {
        console.log("Logging in...");
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        console.log("Registering...");
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          studentId: formData.studentId,
          program: formData.program,
        });
      }
      console.log("Navigate to profile");
  
      navigate('/profile');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };
  

  // Demo credentials info component
  const DemoCredentials = () => (
    <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
      <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-2">Demo Credentials:</h3>
      <div className="space-y-1 text-sm text-indigo-700 dark:text-indigo-300">
        <p>Email: demo@example.com</p>
        <p>Password: demo123</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full">
            <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>

        <form 
         onSubmit={(e)=>handleSubmit(e)}
         className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="input-icon-wrapper">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-animated input-with-icon"
                    placeholder="John Doe"
                  />
                  <User className="input-icon w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student ID
                </label>
                <div className="input-icon-wrapper">
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="input-animated input-with-icon"
                    placeholder="STU001"
                  />
                  <School className="input-icon w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="input-icon-wrapper">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-animated input-with-icon"
                    placeholder="+1234567890"
                  />
                  <Phone className="input-icon w-5 h-5" />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="input-icon-wrapper">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-animated input-with-icon"
                placeholder="john@example.com"
                required
              />
              <Mail className="input-icon w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="input-icon-wrapper">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-animated input-with-icon"
                placeholder="••••••••"
                required
              />
              <Lock className="input-icon w-5 h-5" />
            </div>
          </div>

          <button 
          type="submit" className="btn-primary w-full justify-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {isLogin && <DemoCredentials />}

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;