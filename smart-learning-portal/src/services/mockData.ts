
import { Course, CourseDetails, Review, LearningResource } from "@/types/course";

// Mock courses
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    instructor: {
      id: "2",
      name: "Instructor Name"
    },
    rating: 4.7,
    reviewCount: 124,
    enrolledCount: 1250,
    status: "approved",
    createdAt: "2023-03-15T00:00:00Z"
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Master the essential concepts of data science, statistics, and machine learning.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    instructor: {
      id: "4",
      name: "Jordan Statistics"
    },
    rating: 4.9,
    reviewCount: 89,
    enrolledCount: 930,
    status: "approved",
    createdAt: "2023-04-20T00:00:00Z"
  },
  {
    id: "3",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native and JavaScript.",
    thumbnail: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    instructor: {
      id: "2",
      name: "Taylor Teacher"
    },
    rating: 4.5,
    reviewCount: 56,
    enrolledCount: 680,
    status: "approved",
    createdAt: "2023-05-10T00:00:00Z"
  },
  {
    id: "4",
    title: "Advanced UI/UX Design Principles",
    description: "Take your design skills to the next level with advanced UI/UX principles and tools.",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    instructor: {
      id: "5",
      name: "Casey Designer"
    },
    rating: 4.8,
    reviewCount: 72,
    enrolledCount: 845,
    status: "approved",
    createdAt: "2023-06-05T00:00:00Z"
  },
  {
    id: "5",
    title: "Cybersecurity Essentials",
    description: "Learn how to protect systems and networks from digital attacks and security breaches.",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    instructor: {
      id: "6",
      name: "Morgan Security"
    },
    rating: 4.6,
    reviewCount: 63,
    enrolledCount: 720,
    status: "approved",
    createdAt: "2023-07-12T00:00:00Z"
  },
  {
    id: "6",
    title: "Artificial Intelligence for Beginners",
    description: "An introduction to AI concepts, algorithms, and their practical applications.",
    thumbnail: "https://images.unsplash.com/photo-1677442135146-29c0dfc73a2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    instructor: {
      id: "7",
      name: "Quinn AI"
    },
    rating: 4.7,
    reviewCount: 48,
    enrolledCount: 560,
    status: "pending",
    createdAt: "2023-08-18T00:00:00Z"
  }
];

// Mock course details
export const mockCourseDetails: Record<string, CourseDetails> = {
  "1": {
    ...mockCourses[0],
    modules: [
      {
        id: "m1",
        title: "HTML Fundamentals",
        lessons: [
          {
            id: "l1",
            title: "Introduction to HTML",
            content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
            resources: [
              {
                id: "r1",
                title: "HTML Cheat Sheet",
                type: "pdf",
                url: "#",
                uploadedAt: "2023-08-15T00:00:00Z"
              }
            ]
          },
          {
            id: "l2",
            title: "HTML Elements and Attributes",
            content: "Learn about different HTML elements and attributes that form the building blocks of web pages.",
            resources: [
              {
                id: "r2",
                title: "HTML Elements Reference",
                type: "pdf",
                url: "#",
                uploadedAt: "2023-08-16T00:00:00Z"
              }
            ]
          }
        ]
      },
      {
        id: "m2",
        title: "CSS Basics",
        lessons: [
          {
            id: "l3",
            title: "Introduction to CSS",
            content: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
            resources: [
              {
                id: "r3",
                title: "CSS Fundamentals",
                type: "pdf",
                url: "#",
                uploadedAt: "2023-08-17T00:00:00Z"
              }
            ]
          },
          {
            id: "l4",
            title: "CSS Selectors and Properties",
            content: "Learn how to select HTML elements and apply various styling properties.",
            resources: [
              {
                id: "r4",
                title: "CSS Properties Guide",
                type: "pdf",
                url: "#",
                uploadedAt: "2023-08-18T00:00:00Z"
              }
            ]
          }
        ]
      },
      {
        id: "m3",
        title: "JavaScript Essentials",
        lessons: [
          {
            id: "l5",
            title: "Introduction to JavaScript",
            content: "JavaScript is a programming language that enables interactive web pages.",
            resources: [
              {
                id: "r5",
                title: "JavaScript Basics",
                type: "pdf",
                url: "#",
                uploadedAt: "2023-08-19T00:00:00Z"
              }
            ]
          },
          {
            id: "l6",
            title: "JavaScript Functions and Events",
            content: "Learn how to create functions and handle events in JavaScript.",
            resources: [
              {
                id: "r6",
                title: "JavaScript Functions Guide",
                type: "pdf",
                url: "#",
                uploadedAt: "2023-08-20T00:00:00Z"
              }
            ]
          }
        ]
      }
    ],
    forum: [
      {
        id: "f1",
        title: "How to center a div?",
        author: {
          id: "1",
          name: "Alex Student",
          role: "student"
        },
        createdAt: "2023-09-15T10:30:00Z",
        replies: 5,
        isPinned: false
      },
      {
        id: "f2",
        title: "Important: Final Project Requirements",
        author: {
          id: "2",
          name: "Taylor Teacher",
          role: "instructor"
        },
        createdAt: "2023-09-10T14:20:00Z",
        replies: 3,
        isPinned: true
      }
    ]
  }
};

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: "r1",
    courseId: "1",
    userId: "u1",
    userName: "John Doe",
    rating: 5,
    comment: "Great course! I learned a lot about web development fundamentals.",
    createdAt: "2023-08-15T08:45:00Z"
  },
  {
    id: "r2",
    courseId: "1",
    userId: "u2",
    userName: "Jane Smith",
    rating: 4,
    comment: "Excellent content, but I would have liked more practical exercises.",
    createdAt: "2023-08-20T13:20:00Z"
  },
  {
    id: "r3",
    courseId: "1",
    userId: "u3",
    userName: "Mike Johnson",
    rating: 5,
    comment: "The instructor explains concepts clearly. Highly recommended!",
    createdAt: "2023-09-05T10:10:00Z"
  }
];

// Mock enrolled courses for student
export const mockEnrolledCourses = [
  {
    courseId: "1",
    progress: 0.65,
    enrolledDate: "2023-08-01T00:00:00Z",
    lastAccessedDate: "2023-09-18T00:00:00Z"
  },
  {
    courseId: "2",
    progress: 0.30,
    enrolledDate: "2023-08-15T00:00:00Z",
    lastAccessedDate: "2023-09-15T00:00:00Z"
  }
];

// Mock functions to simulate API calls
export const getMockCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 500);
  });
};

export const getMockCourseById = (id: string): Promise<CourseDetails | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourseDetails[id] || undefined);
    }, 500);
  });
};

export const getMockReviewsByCourseId = (courseId: string): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReviews.filter(review => review.courseId === courseId));
    }, 500);
  });
};

export const getMockEnrolledCourses = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrichedCourses = mockEnrolledCourses.map(enrollment => {
        const course = mockCourses.find(c => c.id === enrollment.courseId);
        return { ...enrollment, course };
      });
      resolve(enrichedCourses);
    }, 500);
  });
};

// For instructors
export const getMockInstructorCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses.filter(course => course.instructor.id === "2"));
    }, 500);
  });
};

// For admins
export const getMockPendingCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses.filter(course => course.status === "pending"));
    }, 500);
  });
};

export const getMockUsers = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Student Name",
          email: "student@example.com",
          role: "student",
          joinDate: "2023-05-15T00:00:00Z",
          lastLogin: "2023-09-18T14:30:00Z"
        },
        {
          id: "2",
          name: "Instructor Name",
          email: "instructor@example.com",
          role: "instructor",
          joinDate: "2023-03-10T00:00:00Z",
          lastLogin: "2023-09-19T09:15:00Z"
        },
        {
          id: "3",
          name: "Admin",
          email: "admin@example.com",
          role: "admin",
          joinDate: "2023-01-05T00:00:00Z",
          lastLogin: "2023-09-19T11:45:00Z"
        }
      ]);
    }, 500);
  });
};
