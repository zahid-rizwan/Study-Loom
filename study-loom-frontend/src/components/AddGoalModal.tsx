import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose }) => {
  const courses = useStore((state) => state.courses);
  const addGoal = useStore((state) => state.addGoal);
  const [goalData, setGoalData] = useState({
    title: '',
    deadline: '',
    type: 'custom' as const,
    relatedId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      id: crypto.randomUUID(),
      ...goalData,
      isCompleted: false,
    });
    setGoalData({ title: '', deadline: '', type: 'custom', relatedId: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Goal</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Goal Title
            </label>
            <input
              type="text"
              value={goalData.title}
              onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
              className="input-animated"
              placeholder="Enter goal title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Goal Type
            </label>
            <select
              value={goalData.type}
              onChange={(e) => setGoalData({ ...goalData, type: e.target.value as any })}
              className="input-animated"
              required
            >
              <option value="custom">Custom Goal</option>
              <option value="chapter">Chapter Completion</option>
              <option value="topic">Topic Completion</option>
            </select>
          </div>

          {(goalData.type === 'chapter' || goalData.type === 'topic') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Related Course
              </label>
              <select
                value={goalData.relatedId}
                onChange={(e) => setGoalData({ ...goalData, relatedId: e.target.value })}
                className="input-animated"
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deadline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="date"
                value={goalData.deadline}
                onChange={(e) => setGoalData({ ...goalData, deadline: e.target.value })}
                className="input-animated pl-10"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;