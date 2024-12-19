import React from 'react';
import { Bell, Plus, Calendar, Clock } from 'lucide-react';

const RemindersPage = () => {
  const reminders = [
    {
      id: '1',
      title: 'Study Data Structures',
      date: '2024-03-10',
      time: '14:00',
      type: 'Study Session',
    },
    {
      id: '2',
      title: 'Operating Systems Quiz',
      date: '2024-03-15',
      time: '10:00',
      type: 'Quiz',
    },
  ];

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <Bell className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold dark:text-white">Reminders</h1>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      <div className="grid gap-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg dark:text-white">{reminder.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{reminder.time}</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400 rounded-full text-sm">
                {reminder.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemindersPage;