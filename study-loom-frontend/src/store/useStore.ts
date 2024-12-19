import { create } from 'zustand';
import { Course, Subject, Chapter, Topic, Goal } from '../types';
import { initialCourses } from '../data/initialCourses';

interface Store {
  courses: Course[];
  goals: Goal[];
  darkMode: boolean;
  addCourse: (course: Course) => void;
  addSubjectToCourse: (courseId: string, subject: Subject) => void;
  addChapterToSubject: (courseId: string, subjectId: string, chapter: Chapter) => void;
  toggleTopicCompletion: (courseId: string, subjectId: string, chapterId: string, topicId: string) => void;
  addGoal: (goal: Goal) => void;
  toggleGoalCompletion: (goalId: string) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  courses: initialCourses,
  goals: [],
  darkMode: false,
  
  addCourse: (course) => 
    set((state) => ({ courses: [...state.courses, course] })),
  
  addSubjectToCourse: (courseId, subject) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? { ...course, subjects: [...course.subjects, subject] }
          : course
      ),
    })),
  
  addChapterToSubject: (courseId, subjectId, chapter) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              subjects: course.subjects.map((subject) =>
                subject.id === subjectId
                  ? { ...subject, chapters: [...subject.chapters, chapter] }
                  : subject
              ),
            }
          : course
      ),
    })),
  
  toggleTopicCompletion: (courseId, subjectId, chapterId, topicId) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              subjects: course.subjects.map((subject) =>
                subject.id === subjectId
                  ? {
                      ...subject,
                      chapters: subject.chapters.map((chapter) =>
                        chapter.id === chapterId
                          ? {
                              ...chapter,
                              topics: chapter.topics.map((topic) =>
                                topic.id === topicId
                                  ? { ...topic, isCompleted: !topic.isCompleted }
                                  : topic
                              ),
                            }
                          : chapter
                      ),
                      progress: calculateSubjectProgress(subject, chapterId, topicId),
                    }
                  : subject
              ),
            }
          : course
      ),
    })),
  
  addGoal: (goal) =>
    set((state) => ({ goals: [...state.goals, goal] })),
  
  toggleGoalCompletion: (goalId) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, isCompleted: !goal.isCompleted }
          : goal
      ),
    })),

  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),
}));

function calculateSubjectProgress(
  subject: Subject,
  updatedChapterId: string,
  updatedTopicId: string
): number {
  const totalTopics = subject.chapters.reduce(
    (acc, chapter) => acc + chapter.topics.length,
    0
  );

  const completedTopics = subject.chapters.reduce((acc, chapter) => {
    return acc + chapter.topics.reduce((topicAcc, topic) => {
      if (chapter.id === updatedChapterId && topic.id === updatedTopicId) {
        return topicAcc + (topic.isCompleted ? 0 : 1);
      }
      return topicAcc + (topic.isCompleted ? 1 : 0);
    }, 0);
  }, 0);

  return Math.round((completedTopics / totalTopics) * 100);
}