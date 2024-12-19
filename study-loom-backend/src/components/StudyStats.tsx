import React from 'react';
import { Clock, Calendar, TrendingUp, BarChart2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface StudyStats {
  totalHours: number;
  sessionsCompleted: number;
  averageSessionLength: number;
  subjectDistribution: Array<{
    subject: string;
    hours: number;
  }>;
  weeklyProgress: Array<{
    day: string;
    hours: number;
  }>;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StudyStats: React.FC<{ stats: StudyStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Total Hours</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.totalHours}h
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Sessions</span>
            </div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.sessionsCompleted}
            </p>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/50 rounded-lg">
            <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Avg Length</span>
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.averageSessionLength}h
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-2">
              <BarChart2 className="w-5 h-5" />
              <span className="font-medium">Subjects</span>
            </div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.subjectDistribution.length}
            </p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Subject Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.subjectDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="hours"
              >
                {stats.subjectDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6 md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" className="dark:opacity-20" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudyStats;