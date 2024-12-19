export const initialCourses = [
  {
    id: '1',
    name: 'B.Tech Computer Science (Semester 5)',
    startDate: '2024-01-15',
    endDate: '2024-05-30',
    subjects: [
      {
        id: 's1',
        name: 'Data Structures',
        progress: 65,
        chapters: [
          {
            id: 'c1',
            name: 'Arrays and Strings',
            topics: [
              { id: 't1', name: 'Introduction to Arrays', isCompleted: true },
              { id: 't2', name: 'Array Operations', isCompleted: true },
              { id: 't3', name: 'String Manipulation', isCompleted: false },
            ],
          },
          {
            id: 'c2',
            name: 'Linked Lists',
            topics: [
              { id: 't4', name: 'Singly Linked Lists', isCompleted: true },
              { id: 't5', name: 'Doubly Linked Lists', isCompleted: false },
              { id: 't6', name: 'Circular Linked Lists', isCompleted: false },
            ],
          },
        ],
      },
      {
        id: 's2',
        name: 'Operating Systems',
        progress: 40,
        chapters: [
          {
            id: 'c3',
            name: 'Process Management',
            topics: [
              { id: 't7', name: 'Process States', isCompleted: true },
              { id: 't8', name: 'Process Scheduling', isCompleted: false },
            ],
          },
          {
            id: 'c4',
            name: 'Memory Management',
            topics: [
              { id: 't9', name: 'Virtual Memory', isCompleted: false },
              { id: 't10', name: 'Paging', isCompleted: false },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Web Development Bootcamp',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    subjects: [
      {
        id: 's3',
        name: 'Frontend Development',
        progress: 80,
        chapters: [
          {
            id: 'c5',
            name: 'HTML & CSS',
            topics: [
              { id: 't11', name: 'HTML Basics', isCompleted: true },
              { id: 't12', name: 'CSS Layouts', isCompleted: true },
              { id: 't13', name: 'Responsive Design', isCompleted: true },
            ],
          },
          {
            id: 'c6',
            name: 'JavaScript',
            topics: [
              { id: 't14', name: 'JS Fundamentals', isCompleted: true },
              { id: 't15', name: 'DOM Manipulation', isCompleted: false },
            ],
          },
        ],
      },
    ],
  },
];