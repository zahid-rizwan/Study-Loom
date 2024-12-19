import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';
import ProgressPage from './pages/ProgressPage';
import GoalsPage from './pages/GoalsPage';
import RemindersPage from './pages/RemindersPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './store/slices/authSlice';

function App() {
  const darkMode = useStore((state) => state.darkMode);
  const isAuthenticated = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch=useDispatch();

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    return !isAuthenticated ? children : <Navigate to="/" />;
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(loginSuccess());
    }
  },[isAuthenticated])
  useEffect(()=>{
      console.log("token:",localStorage.getItem("token"));
      console.log("isAuthenticated:",isAuthenticated);
  },[isAuthenticated])
  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                  <Sidebar />
                  <div className="flex-1 md:ml-64">
                    <Header />
                    <main className="mt-16 overflow-y-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/courses/:courseId" element={<CourseDetails />} />
                        <Route path="/progress" element={<ProgressPage />} />
                        <Route path="/goals" element={<GoalsPage />} />
                        <Route path="/reminders" element={<RemindersPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;