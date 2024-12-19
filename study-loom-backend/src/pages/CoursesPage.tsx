import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import AddCourseModal from '../components/AddCourseModal';
import { useStore } from '../store/useStore';

const CoursesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courses = useStore((state) => state.courses);

  const handleCourseClick = (courseId: string) => {
    // Navigate to course details
  };

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">My Courses</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={handleCourseClick}
          />
        ))}
      </div>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CoursesPage;