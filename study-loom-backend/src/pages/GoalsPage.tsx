import React, { useState } from 'react';
import { Target, Plus, Calendar, Check, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import AddGoalModal from '../components/AddGoalModal';

const GoalsPage = () => {
  const { goals, toggleGoalCompletion, courses } = useStore();
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getRelatedCourseName = (goalType: string, relatedId: string | undefined) => {
    if (!relatedId || !goalType) return null;
    const course = courses.find(c => c.id === relatedId);
    return course ? `Course: ${course.name}` : null;
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold dark:text-white">Goals</h1>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          <span>New Goal</span>
        </button>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => {
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isOverdue = daysRemaining < 0;
          const relatedCourse = getRelatedCourseName(goal.type, goal.relatedId);

          return (
            <div key={goal.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleGoalCompletion(goal.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        goal.isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {goal.isCompleted && <Check className="w-4 h-4" />}
                    </button>
                    <h3 className={`font-semibold text-lg dark:text-white ${goal.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                      {goal.title}
                    </h3>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      {!goal.isCompleted && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className={isOverdue ? 'text-red-500' : ''}>
                            {isOverdue 
                              ? `${Math.abs(daysRemaining)} days overdue`
                              : `${daysRemaining} days remaining`}
                          </span>
                        </div>
                      )}
                    </div>
                    {relatedCourse && (
                      <div className="text-sm text-indigo-600 dark:text-indigo-400">{relatedCourse}</div>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  goal.isCompleted 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                    : isOverdue
                    ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
                }`}>
                  {goal.isCompleted ? 'Completed' : isOverdue ? 'Overdue' : 'In Progress'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <AddGoalModal
        isOpen={showAddGoal}
        onClose={() => setShowAddGoal(false)}
      />
    </div>
  );
};

export default GoalsPage;