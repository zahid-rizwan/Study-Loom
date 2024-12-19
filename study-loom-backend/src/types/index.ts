export interface Course {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
  progress: number;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface Goal {
  id: string;
  title: string;
  deadline: string;
  isCompleted: boolean;
  type: 'chapter' | 'topic' | 'custom';
  relatedId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId: string;
  program: string;
  semester: number;
  joinDate: string;
  phone?: string;
  address?: string;
  bio?: string;
}

export interface StudySession {
  id: string;
  subjectId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  notes?: string;
  materials?: string[];
}

export interface StudyStats {
  totalHours: number;
  sessionsCompleted: number;
  averageSessionLength: number;
  subjectDistribution: Array<{
    subject: string;
    hours: number;
  }>;
  weeklyProgress: Array<{
    day: string;
    hours: number;
  }>;
}