import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, School, Calendar, Pencil } from 'lucide-react';
import axios from 'axios';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    studentId: '',
    program: '',
    semester: 0,
    joinDate: '',
    phone: '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    // Simulating API call with stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData({
        ...user,
        phone: user.phone || '+1234567890',
        address: user.address || '123 Campus Street, University City',
        bio: user.bio || 'Computer Science student passionate about software development and machine learning.',
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulating API update
      localStorage.setItem('user', JSON.stringify(userData));
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Student Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-primary"
          >
            <Pencil className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold dark:text-white">{userData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{userData.studentId}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="card p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="input-animated"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="input-animated"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="input-animated"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Program
                  </label>
                  <input
                    type="text"
                    value={userData.program}
                    onChange={(e) => setUserData({ ...userData, program: e.target.value })}
                    className="input-animated"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Semester
                  </label>
                  <input
                    type="number"
                    value={userData.semester}
                    onChange={(e) => setUserData({ ...userData, semester: parseInt(e.target.value) })}
                    className="input-animated"
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={userData.joinDate}
                    onChange={(e) => setUserData({ ...userData, joinDate: e.target.value })}
                    className="input-animated"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  className="input-animated"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={userData.bio}
                  onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                  className="input-animated h-24 resize-none"
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;