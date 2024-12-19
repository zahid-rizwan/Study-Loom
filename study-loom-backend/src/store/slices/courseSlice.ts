import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, Subject, Chapter, Topic } from '../../types';

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    addSubjectToCourse: (
      state,
      action: PayloadAction<{ courseId: string; subject: Subject }>
    ) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.subjects.push(action.payload.subject);
      }
    },
    addChapterToSubject: (
      state,
      action: PayloadAction<{
        courseId: string;
        subjectId: string;
        chapter: Chapter;
      }>
    ) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        const subject = course.subjects.find(s => s.id === action.payload.subjectId);
        if (subject) {
          subject.chapters.push(action.payload.chapter);
        }
      }
    },
    addTopicToChapter: (
      state,
      action: PayloadAction<{
        courseId: string;
        subjectId: string;
        chapterId: string;
        topic: Topic;
      }>
    ) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        const subject = course.subjects.find(s => s.id === action.payload.subjectId);
        if (subject) {
          const chapter = subject.chapters.find(ch => ch.id === action.payload.chapterId);
          if (chapter) {
            chapter.topics.push(action.payload.topic);
          }
        }
      }
    },
    toggleTopicCompletion: (
      state,
      action: PayloadAction<{
        courseId: string;
        subjectId: string;
        chapterId: string;
        topicId: string;
      }>
    ) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        const subject = course.subjects.find(s => s.id === action.payload.subjectId);
        if (subject) {
          const chapter = subject.chapters.find(ch => ch.id === action.payload.chapterId);
          if (chapter) {
            const topic = chapter.topics.find(t => t.id === action.payload.topicId);
            if (topic) {
              topic.isCompleted = !topic.isCompleted;
            }
          }
        }
      }
    },
  },
});

export const {
  addCourse,
  addSubjectToCourse,
  addChapterToSubject,
  addTopicToChapter,
  toggleTopicCompletion,
} = courseSlice.actions;

export default courseSlice.reducer;