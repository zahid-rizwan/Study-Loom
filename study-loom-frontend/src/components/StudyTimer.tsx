import React, { useState, useEffect } from 'react';
import { Play, Pause, StopCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { studySessionService } from '../services/studySession.service';

interface StudyTimerProps {
  subjectId: string;
  onSessionEnd?: () => void;
}

const StudyTimer: React.FC<StudyTimerProps> = ({ subjectId, onSessionEnd }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = async () => {
    try {
      const session = await studySessionService.startStudySession(subjectId);
      setCurrentSession(session);
      setIsRunning(true);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const pauseSession = () => {
    setIsRunning(false);
  };

  const resumeSession = () => {
    setIsRunning(true);
  };

  const endSession = async () => {
    if (!currentSession) return;
    
    try {
      await studySessionService.endStudySession(currentSession.id, notes);
      setIsRunning(false);
      setSessionTime(0);
      setCurrentSession(null);
      setNotes('');
      onSessionEnd?.();
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Study Timer</h3>
        <div className="flex items-center space-x-2 text-2xl font-mono dark:text-white">
          <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>{formatTime(sessionTime)}</span>
        </div>
      </div>

      <div className="space-y-4">
        {isRunning && (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add session notes..."
            className="input-animated h-24"
          />
        )}

        <div className="flex justify-center space-x-4">
          {!isRunning && !currentSession && (
            <button
              onClick={startSession}
              className="btn-primary"
            >
              <Play className="w-5 h-5" />
              <span>Start Session</span>
            </button>
          )}

          {isRunning && (
            <>
              <button
                onClick={pauseSession}
                className="btn-primary bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
              <button
                onClick={endSession}
                className="btn-primary bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                <StopCircle className="w-5 h-5" />
                <span>End Session</span>
              </button>
            </>
          )}

          {!isRunning && currentSession && (
            <>
              <button
                onClick={resumeSession}
                className="btn-primary"
              >
                <Play className="w-5 h-5" />
                <span>Resume</span>
              </button>
              <button
                onClick={endSession}
                className="btn-primary bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                <StopCircle className="w-5 h-5" />
                <span>End Session</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;