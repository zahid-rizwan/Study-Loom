import React from 'react';
import { Plus, Clock, Target, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      icon: Plus,
      label: 'New Course',
      onClick: () => navigate('/courses'),
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/50',
    },
    {
      icon: Clock,
      label: 'Study Session',
      onClick: () => navigate('/courses'),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/50',
    },
    {
      icon: Target,
      label: 'Set Goal',
      onClick: () => navigate('/goals'),
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/50',
    },
    {
      icon: Bell,
      label: 'Add Reminder',
      onClick: () => navigate('/reminders'),
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
          >
            <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
              <Icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;