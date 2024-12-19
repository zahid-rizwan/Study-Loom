import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { useStore } from '../store/useStore';
import StudyTimer from '../components/StudyTimer';
import StudyStats from '../components/StudyStats';
import { studySessionService } from '../services/studySession.service';

const CourseDetails = () => {
  const { courseId } = useParams();
  const courses = useStore((state) => state.courses);
  const toggleTopicCompletion = useStore((state) => state.toggleTopicCompletion);
  
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [studyStats, setStudyStats] = useState({
    totalHours: 0,
    sessionsCompleted: 0,
    averageSessionLength: 0,
    subjectDistribution: [],
    weeklyProgress: []
  });
  
  const course = courses.find((c) => c.id === courseId);
  console.log("course:",course)
  useEffect(() => {
    const fetchStudyStats = async () => {
      try {
        const sessions = await studySessionService.getStudySessions();
        // Calculate stats from sessions
        const totalMinutes = sessions.reduce((acc, session) => acc + (session.duration || 0), 0);
        const totalHours = Math.round(totalMinutes / 60);
        
        // Create subject distribution data
        const subjectDistribution = course?.subjects.map(subject => ({
          subject: subject.name,
          hours: sessions
            .filter(session => session.subjectId === subject.id)
            .reduce((acc, session) => acc + ((session.duration || 0) / 60), 0)
        })) || [];

        // Create weekly progress data
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

  if (!course) return <div>Course not found</div>;

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="p-8 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">{course.name}</h1>
      
      <div className="grid gap-6">
        {selectedSubject ? (
          <StudyTimer 
            subjectId={selectedSubject} 
            onSessionEnd={() => setSelectedSubject(null)} 
          />
        ) : (
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Start Study Session</h2>
            <div className="grid gap-4">
              {course.subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium dark:text-white">{subject.name}</span>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400">
                    {subject.progress}% Complete
                  </span>
                </button>
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
    </div>
  );
};

export default CourseDetails;