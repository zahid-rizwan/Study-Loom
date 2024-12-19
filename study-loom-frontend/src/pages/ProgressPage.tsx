import React, { useState } from 'react';
import { BarChart2, BookOpen } from 'lucide-react';
import SubjectProgress from '../components/SubjectProgress';
import { useStore } from '../store/useStore';

const ProgressPage = () => {
  const courses = useStore((state) => state.courses);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  const selectedCourse = selectedCourseId 
    ? courses.find(course => course.id === selectedCourseId)
    : null;

  const getOverallProgress = () => {
    if (selectedCourse) {
      const totalTopics = selectedCourse.subjects.reduce(
        (acc, subject) =>
          acc +
          subject.chapters.reduce(
            (acc, chapter) => acc + chapter.topics.length,
            0
          ),
        0
      );

      const completedTopics = selectedCourse.subjects.reduce(
        (acc, subject) =>
          acc +
          subject.chapters.reduce(
            (acc, chapter) =>
              acc + chapter.topics.filter((topic) => topic.isCompleted).length,
            0
          ),
        0
      );

      return Math.round((completedTopics / totalTopics) * 100);
    }

    return null;
  };

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart2 className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold dark:text-white">Progress Overview</h1>
        </div>
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="input-animated min-w-[200px]"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCourse && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold dark:text-white">{selectedCourse.name}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-400">Overall Progress:</span>
              <span className="font-semibold text-indigo-600">{getOverallProgress()}%</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCourse.subjects.map((subject) => (
              <div key={subject.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium dark:text-white">{subject.name}</span>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <SubjectProgress 
          subjects={selectedCourse ? selectedCourse.subjects : courses.flatMap(c => c.subjects)} 
        />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Study Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="dark:text-gray-300">Total Study Hours</span>
              <span className="font-semibold dark:text-white">24h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="dark:text-gray-300">Completed Topics</span>
              <span className="font-semibold dark:text-white">
                {selectedCourse
                  ? selectedCourse.subjects.reduce(
                      (acc, subject) =>
                        acc +
                        subject.chapters.reduce(
                          (acc, chapter) =>
                            acc +
                            chapter.topics.filter((topic) => topic.isCompleted)
                              .length,
                          0
                        ),
                      0
                    )
                  : courses.reduce(
                      (acc, course) =>
                        acc +
                        course.subjects.reduce(
                          (acc, subject) =>
                            acc +
                            subject.chapters.reduce(
                              (acc, chapter) =>
                                acc +
                                chapter.topics.filter((topic) => topic.isCompleted)
                                  .length,
                              0
                            ),
                          0
                        ),
                      0
                    )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="dark:text-gray-300">Average Daily Progress</span>
              <span className="font-semibold dark:text-white">3.5h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;