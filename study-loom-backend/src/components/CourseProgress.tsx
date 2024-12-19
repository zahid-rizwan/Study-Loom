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
import { Course } from '../types';

interface CourseProgressProps {
  courses: Course[];
  selectedCourseId?: string;
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

const CourseProgress: React.FC<CourseProgressProps> = ({ courses, selectedCourseId }) => {
  const calculateProgress = (course: Course) => {
    const totalTopics = course.subjects.reduce(
      (acc, subject) =>
        acc +
        subject.chapters.reduce(
          (acc, chapter) => acc + chapter.topics.length,
          0
        ),
      0
    );

    const completedTopics = course.subjects.reduce(
      (acc, subject) =>
        acc +
        subject.chapters.reduce(
          (acc, chapter) =>
            acc + chapter.topics.filter((topic) => topic.isCompleted).length,
          0
        ),
      0
    );

    return {
      name: course.name,
      progress: Math.round(totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0),
      subjectProgress: course.subjects.map(subject => ({
        name: subject.name,
        progress: subject.progress
      }))
    };
  };

  const data = selectedCourseId
    ? courses
        .filter(course => course.id === selectedCourseId)
        .flatMap(course => course.subjects.map(subject => ({
          name: subject.name,
          progress: subject.progress,
          target: 100
        })))
    : courses.map(calculateProgress);

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Line Chart */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          {selectedCourseId ? 'Subject Progress Timeline' : 'Course Progress Overview'}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
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
                cursor={{ stroke: '#6b7280', strokeWidth: 1 }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                name="Progress"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ 
                  fill: '#4f46e5', 
                  r: 4,
                  strokeWidth: 2
                }}
                activeDot={{ 
                  r: 6, 
                  fill: '#4f46e5',
                  stroke: '#fff',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Chart */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Progress vs Target</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
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
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.1}
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="progress"
                name="Progress"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;