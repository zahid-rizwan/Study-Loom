import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
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

interface StudyStatsProps {
  stats: StudyStats;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StudyStats: React.FC<StudyStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Study Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
            <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Total Hours</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.totalHours}h
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">Sessions</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.sessionsCompleted}
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
            <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Avg Length</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.averageSessionLength}h
            </div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/50 rounded-lg">
            <div className="text-sm text-orange-600 dark:text-orange-400 mb-1">Subjects</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.subjectDistribution.length}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Weekly Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" className="dark:opacity-20" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="hours"
                name="Study Hours"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Subject Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.subjectDistribution}>
              <CartesianGrid strokeDasharray="3 3" className="dark:opacity-20" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="hours"
                name="Hours"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ fill: '#4f46e5', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudyStats;