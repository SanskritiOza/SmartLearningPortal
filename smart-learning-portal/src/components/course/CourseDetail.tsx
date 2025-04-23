import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CourseDetails, LearningResource, StudentGrade } from "@/types/course";
import { getMockCourseById } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ForumList } from "@/components/forum/ForumList";
import { UnitInformation } from "@/components/course/UnitInformation";
import { LearningMaterials } from "@/components/course/LearningMaterials";
import { CourseGrades } from "@/components/course/CourseGrades";
import { 
  Star, 
  FileText, 
  Check, 
  Clock, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Download,
  GraduationCap,
  Pin
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for resources and grades
  const [resources, setResources] = useState<LearningResource[]>([
    {
      id: "1",
      title: "Week 1 Lecture Slides",
      type: "pdf",
      url: "#",
      description: "Introduction to course concepts and overview",
      uploadedAt: "2025-03-01T09:00:00Z"
    },
    {
      id: "2",
      title: "Required Reading: Chapter 1",
      type: "pdf",
      url: "#",
      description: "Foundational reading from textbook",
      uploadedAt: "2025-03-01T09:30:00Z"
    },
    {
      id: "3",
      title: "Introductory Video Lecture",
      type: "video",
      url: "#",
      description: "Video overview of the course structure and expectations",
      uploadedAt: "2025-03-02T10:00:00Z"
    },
    {
      id: "4",
      title: "Supplementary Resource Website",
      type: "link",
      url: "https://example.org/resources",
      description: "External website with additional practice materials",
      uploadedAt: "2025-03-03T14:00:00Z"
    }
  ]);
  
  const [grades, setGrades] = useState<StudentGrade[]>([
    {
      id: "1",
      studentId: "1",
      courseId: id || "",
      assessmentId: "1",
      assessment: {
        id: "1",
        title: "Quiz 1",
        description: "Basic concepts quiz",
        dueDate: "2025-03-15T23:59:00Z",
        totalMarks: 20,
        weight: 10,
        type: "quiz"
      },
      grade: 18,
      feedback: "Good work! You've demonstrated a strong understanding of the basic concepts.",
      submittedAt: "2025-03-15T20:30:00Z",
      gradedAt: "2025-03-17T14:20:00Z",
      status: "graded"
    },
    {
      id: "2",
      studentId: "1",
      courseId: id || "",
      assessmentId: "2",
      assessment: {
        id: "2",
        title: "Assignment 1",
        description: "Research paper on selected topic",
        dueDate: "2025-04-05T23:59:00Z",
        totalMarks: 50,
        weight: 30,
        type: "assignment"
      },
      grade: 42,
      submittedAt: "2025-04-05T22:45:00Z",
      gradedAt: "2025-04-10T16:00:00Z",
      status: "graded"
    },
    {
      id: "3",
      studentId: "1",
      courseId: id || "",
      assessmentId: "3",
      assessment: {
        id: "3",
        title: "Midterm Exam",
        description: "Comprehensive exam covering first half of the course",
        dueDate: "2025-04-20T14:00:00Z",
        totalMarks: 100,
        weight: 30,
        type: "exam"
      },
      grade: 0,
      status: "pending"
    },
    {
      id: "4",
      studentId: "1",
      courseId: id || "",
      assessmentId: "4",
      assessment: {
        id: "4",
        title: "Final Project",
        description: "Capstone project applying course concepts",
        dueDate: "2025-05-20T23:59:00Z",
        totalMarks: 100,
        weight: 30,
        type: "project"
      },
      grade: 0,
      status: "not submitted"
    }
  ]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        const data = await getMockCourseById(id);
        if (data) {
          setCourse(data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    toast({
      title: "Enrolled Successfully",
      description: `You have enrolled in ${course?.title}. Start learning now!`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-96 bg-gray-200 rounded mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Course Not Found</h2>
        <p className="text-gray-500 mb-8">
          The course you're looking for doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          
          <div className="flex items-center mb-8 space-x-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${course.instructor.id}`} />
                <AvatarFallback>
                  {course.instructor.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-sm text-muted-foreground">Instructor</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{course.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">
                ({course.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {course.enrolledCount} students
              </span>
            </div>
          </div>
          
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="forum">Forum</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium">Course Modules</h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module) => (
                    <AccordionItem value={module.id} key={module.id}>
                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                        {module.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                            >
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{lesson.title}</span>
                              </div>
                              <div className="flex items-center">
                                {lesson.completed ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <Check className="h-3 w-3 mr-1" /> 
                                    Completed
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" /> 
                                    Not Started
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="information" className="mt-6">
              <UnitInformation course={course} />
            </TabsContent>
            
            <TabsContent value="materials" className="mt-6">
              <LearningMaterials resources={resources} />
            </TabsContent>
            
            <TabsContent value="grades" className="mt-6">
              <CourseGrades grades={grades} courseId={course.id} />
            </TabsContent>
            
            <TabsContent value="forum" className="mt-6">
              <ForumList threads={course.forum} courseId={course.id} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-20">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full aspect-video object-cover"
              />
              {course.status === "pending" && (
                <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 bg-yellow-100 text-yellow-800"
                >
                  Pending Approval
                </Badge>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-lg text-muted-foreground">Code: </span>
                {course.id.toUpperCase().substring(0, 8)}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-learn-primary" />
                  <span>{course.creditPoints || 10} Credit Points</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-learn-primary" />
                  <span>8 weeks, 3-5 hours/week</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-learn-primary" />
                  <span>Start anytime, self-paced</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-learn-primary" />
                  <span>Certificate on completion</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-learn-primary" />
                  <span>Discussion forum access</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-5 w-5 mr-2 text-learn-primary" />
                  <span>Downloadable resources</span>
                </div>
              </div>
              
              {user?.role === "student" ? (
                <Button onClick={handleEnroll} className="w-full mb-4">
                  Enroll Now
                </Button>
              ) : user?.role === "instructor" ? (
                <Button asChild variant="outline" className="w-full mb-4">
                  <Link to={`/edit-course/${course.id}`}>Edit Course</Link>
                </Button>
              ) : (
                <Button asChild className="w-full mb-4">
                  <Link to="/login">Log in to Enroll</Link>
                </Button>
              )}
              
              <p className="text-center text-sm text-muted-foreground">
                Enrollment deadline: June 30, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
