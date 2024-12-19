import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Subject } from '../types';

interface SubjectProgressProps {
  subjects: Subject[];
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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

const SubjectProgress: React.FC<SubjectProgressProps> = ({ subjects }) => {
  const data = subjects.map((subject) => {
    const totalTopics = subject.chapters.reduce(
      (acc, chapter) => acc + chapter.topics.length,
      0
    );
    const completedTopics = subject.chapters.reduce(
      (acc, chapter) =>
        acc + chapter.topics.filter((topic) => topic.isCompleted).length,
      0
    );

    return {
      name: subject.name,
      progress: subject.progress,
      completedTopics,
      totalTopics,
      completion: Math.round((completedTopics / totalTopics) * 100),
    };
  });

  const radarData = subjects.map((subject) => ({
    subject: subject.name,
    progress: subject.progress,
    completion: Math.round(
      (subject.chapters.reduce(
        (acc, chapter) =>
          acc + chapter.topics.filter((topic) => topic.isCompleted).length,
        0
      ) /
        subject.chapters.reduce(
          (acc, chapter) => acc + chapter.topics.length,
          0
        )) *
        100
    ),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Progress by Subject</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="dark:opacity-20"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  interval={0}
                  tick={{ 
                    fill: 'currentColor',
                    fontSize: 12
                  }}
                />
                <YAxis 
                  tick={{ 
                    fill: 'currentColor',
                    fontSize: 12
                  }}
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
                <Bar
                  dataKey="progress"
                  fill="#4f46e5"
                  name="Progress"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationBegin={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Completion Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="completion"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Subject Performance Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e5e7eb" className="dark:opacity-20" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: 'currentColor', fontSize: 12 }}
              />
              <Radar
                name="Progress"
                dataKey="progress"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubjectProgress;