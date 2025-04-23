
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
  };
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface CourseDetails extends Course {
  modules: CourseModule[];
  forum: ForumThread[];
  syllabus?: string;
  requirements?: string[];
  learningOutcomes?: string[];
  contactHours?: number;
  creditPoints?: number;
  assessments?: Assessment[];
  lecturers?: Lecturer[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  content: string;
  resources?: LearningResource[];
  completed?: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  type: "pdf" | "video" | "link" | "document";
  url: string;
  description?: string;
  uploadedAt: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  weight: number;
  type: "quiz" | "assignment" | "exam" | "project";
  status?: "upcoming" | "open" | "closed" | "graded";
}

export interface Lecturer {
  id: string;
  name: string;
  title: string;
  email: string;
  office?: string;
  officeHours?: string;
  bio?: string;
  avatar?: string;
}

export interface ForumThread {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
  replies: number;
  isPinned: boolean;
}

export interface ForumPost {
  id: string;
  threadId: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  isAnswer?: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StudentGrade {
  id: string;
  studentId: string;
  courseId: string;
  assessmentId: string;
  assessment: Assessment;
  grade: number;
  feedback?: string;
  submittedAt?: string;
  gradedAt?: string;
  status: "pending" | "graded" | "not submitted";
}

