import React from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const progress = course.subjects.reduce(
    (acc, subject) => acc + subject.progress,
    0
  ) / course.subjects.length;

  return (
    <div 
      className="card p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-semibold text-lg dark:text-white">{course.name}</h3>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="dark:text-gray-400">Progress</span>
            <span className="font-medium dark:text-white">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">{course.subjects.length} Subjects</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
            {course.subjects.filter(s => s.progress === 100).length} Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;