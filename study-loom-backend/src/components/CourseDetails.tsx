import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Clock, Plus, FileText, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import StudyTimer from './study/StudyTimer';
import StudyStats from './study/StudyStats';
import ManualSessionModal from './study/ManualSessionModal';
import FloatingActionButton from './FloatingActionButton';
import { studySessionService } from '../services/studySession.service';
import Breadcrumbs from './Breadcrumbs';

const CourseDetails = () => {
  const { courseId } = useParams();
  const courses = useStore((state) => state.courses);
  const toggleTopicCompletion = useStore((state) => state.toggleTopicCompletion);
  
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showManualModal, setShowManualModal] = useState(false);
  const [studyStats, setStudyStats] = useState({
    totalHours: 0,
    sessionsCompleted: 0,
    averageSessionLength: 0,
    subjectDistribution: [],
    weeklyProgress: []
  });
  
  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    const fetchStudyStats = async () => {
      try {
        const sessions = await studySessionService.getStudySessions();
        const totalMinutes = sessions.reduce((acc, session) => acc + (session.duration || 0), 0);
        const totalHours = Math.round(totalMinutes / 60);
        
        const subjectDistribution = course?.subjects.map(subject => ({
          subject: subject.name,
          hours: sessions
            .filter(session => session.subjectId === subject.id)
            .reduce((acc, session) => acc + ((session.duration || 0) / 60), 0)
        })) || [];

        const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          const dayHours = sessions
            .filter(session => new Date(session.startTime).toDateString() === date.toDateString())
            .reduce((acc, session) => acc + ((session.duration || 0) / 60), 0);
          
          return {
            day: dayStr,
            hours: dayHours
          };
        }).reverse();

        setStudyStats({
          totalHours,
          sessionsCompleted: sessions.length,
          averageSessionLength: sessions.length ? Math.round(totalHours / sessions.length) : 0,
          subjectDistribution,
          weeklyProgress
        });
      } catch (error) {
        console.error('Failed to fetch study stats:', error);
      }
    };

    if (course) {
      fetchStudyStats();
    }
  }, [course]);

  const handleSessionComplete = () => {
    setSelectedSubject(null);
    setShowManualModal(false);
    if (course) {
      fetchStudyStats();
    }
  };

  if (!course) return <div>Course not found</div>;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const openManualSession = () => {
    setSelectedSubject(null);
    setShowManualModal(true);
  };

  return (
    <div className="p-8 pb-24 md:pb-8">
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      {/* Prominent Call-to-Action Banner */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 
        rounded-xl p-6 mb-6 shadow-sm border border-green-200 dark:border-green-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
              <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">Record Your Study Progress</h2>
              <p className="text-sm text-green-600 dark:text-green-400">Track your learning journey by adding study sessions</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={openManualSession}
              className="btn-primary bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl 
                transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              <span>Add Manual Session</span>
            </button>
            <button
              onClick={() => setSelectedSubject(course.subjects[0].id)}
              className="btn-primary"
            >
              <Clock className="w-5 h-5" />
              <span>Start Timer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {selectedSubject ? (
          <StudyTimer 
            subjectId={selectedSubject} 
            onSessionEnd={handleSessionComplete} 
          />
        ) : (
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Study Sessions</h2>
            <div className="grid gap-4">
              {course.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium dark:text-white">{subject.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Progress: {subject.progress}%
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedSubject(subject.id)}
                      className="btn-primary"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Start Timer</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSubject(subject.id);
                        setShowManualModal(true);
                      }}
                      className="btn-primary bg-green-600 hover:bg-green-700"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Add Manual</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <StudyStats stats={studyStats} />

        {course.subjects.map((subject) => (
          <div key={subject.id} className="card">
            <div className="p-6 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold dark:text-white">{subject.name}</h2>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-gray-400">Progress</span>
                  <span className="dark:text-gray-300">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="divide-y dark:divide-gray-700">
              {subject.chapters.map((chapter) => (
                <div key={chapter.id}>
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <span className="font-medium dark:text-white">{chapter.name}</span>
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  
                  {expandedChapters.includes(chapter.id) && (
                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50">
                      <div className="space-y-3">
                        {chapter.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="flex items-center space-x-3 text-sm"
                          >
                            <button
                              onClick={() =>
                                toggleTopicCompletion(courseId, subject.id, chapter.id, topic.id)
                              }
                              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {topic.isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <span className={`dark:text-gray-300 ${topic.isCompleted ? 'line-through text-gray-500 dark:text-gray-500' : ''}`}>
                              {topic.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={openManualSession} />

      {showManualModal && (
        <ManualSessionModal
          subjectId={selectedSubject || course.subjects[0].id}
          onComplete={handleSessionComplete}
          onClose={() => {
            setShowManualModal(false);
            setSelectedSubject(null);
          }}
        />
      )}
    </div>
  );
};

export default CourseDetails;