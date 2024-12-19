import React from 'react';
import { PieChart, Clock, BookOpen, Target } from 'lucide-react';
import QuickActions from './QuickActions';
import SearchBar from './SearchBar';
import Breadcrumbs from './Breadcrumbs';

const Dashboard = () => {
  const stats = [
    { icon: PieChart, label: 'Overall Progress', value: '68%' },
    { icon: Clock, label: 'Study Hours', value: '24h' },
    { icon: BookOpen, label: 'Active Courses', value: '3' },
    { icon: Target, label: 'Goals Completed', value: '12' },
  ];

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search courses, goals, or topics..." />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6 hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</span>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400">{stat.label}</h3>
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Quick Actions</h2>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Today's Goals</h2>
          <div className="space-y-4">
            {['Complete Arrays Chapter', 'Review Operating Systems', 'Practice Problems'].map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-indigo-600 dark:text-indigo-400 rounded border-gray-300 dark:border-gray-600 
                    focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
                />
                <span className="dark:text-gray-300">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Recent Activity</h2>
          <div className="space-y-4">
            {[
              'Completed "Binary Trees" topic',
              'Added new goal for Software Engineering',
              'Achieved 100% in Data Structures',
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;