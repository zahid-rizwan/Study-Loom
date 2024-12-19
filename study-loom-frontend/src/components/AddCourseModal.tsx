import React, { useState } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
  const addCourse = useStore((state) => state.addCourse);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subjects, setSubjects] = useState<Array<{
    id: string;
    name: string;
    topics: Array<{ id: string; name: string }>;
  }>>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { id: crypto.randomUUID(), name: '', topics: [] },
    ]);
  };

  const addTopicToSubject = (subjectId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: [...subject.topics, { id: crypto.randomUUID(), name: '' }],
            }
          : subject
      )
    );
  };

  const updateSubjectName = (id: string, name: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, name } : subject
      )
    );
  };

  const updateTopicName = (subjectId: string, topicId: string, name: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.id === topicId ? { ...topic, name } : topic
              ),
            }
          : subject
      )
    );
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  const removeTopic = (subjectId: string, topicId: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.filter((topic) => topic.id !== topicId),
            }
          : subject
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCourse = {
      id: crypto.randomUUID(),
      name,
      startDate,
      endDate,
      subjects: subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        progress: 0,
        chapters: [
          {
            id: crypto.randomUUID(),
            name: 'Main Chapter',
            topics: subject.topics.map((topic) => ({
              id: topic.id,
              name: topic.name,
              isCompleted: false,
            })),
          },
        ],
      })),
    };
    
    addCourse(newCourse);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setName('');
      setStartDate('');
      setEndDate('');
      setSubjects([]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl my-8 relative">
        {showSuccess && (
          <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 rounded-xl flex items-center justify-center">
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Check className="w-6 h-6" />
              <span className="text-lg font-medium">Course Added Successfully!</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Course</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-animated"
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-animated"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-animated"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Subjects</h3>
              <button
                type="button"
                onClick={addSubject}
                className="btn-primary"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject</span>
              </button>
            </div>

            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="border dark:border-gray-700 rounded-lg p-4 space-y-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => updateSubjectName(subject.id, e.target.value)}
                      placeholder="Subject Name"
                      className="input-animated"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubject(subject.id)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pl-4 space-y-2">
                  {subject.topics.map((topic) => (
                    <div key={topic.id} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={topic.name}
                        onChange={(e) =>
                          updateTopicName(subject.id, topic.id, e.target.value)
                        }
                        placeholder="Topic Name"
                        className="input-animated"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeTopic(subject.id, topic.id)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTopicToSubject(subject.id)}
                    className="flex items-center space-x-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Topic</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
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
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;