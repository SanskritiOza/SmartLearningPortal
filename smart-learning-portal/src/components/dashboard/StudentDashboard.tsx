import { useEffect, useState, useRef } from "react";
import { getMockEnrolledCourses } from "@/services/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Book, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { StudyBotChat } from "@/components/chat/StudyBotChat";
import { DocumentSummarizer } from "@/components/chat/DocumentSummarizer";

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [announcement] = useState("Welcome to SmartLearn! Check out the new features on your dashboard.");
  const [showChat, setShowChat] = useState(false);
  const [showSummarizer, setShowSummarizer] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const summarizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const data = await getMockEnrolledCourses();
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="bg-gray-100 h-20"></CardHeader>
            <CardContent className="pt-6">
              <div className="h-4 bg-gray-100 rounded mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-100 rounded w-1/2 mb-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't enrolled in any courses yet. Browse our catalog to find
            your next learning opportunity.
          </p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {announcement && (
        <div className="bg-blue-100 text-blue-800 text-center py-2 text-sm font-medium">
          {announcement}
        </div>
      )}
      {/* Exclusive Features for Students */}
      {user?.role === "student" && (
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2 text-learn-primary">AI Chatbot</h3>
            <p className="text-gray-700 mb-3">Get instant help and answers to your study questions with our exclusive AI-powered chatbot.</p>
            <Button variant="secondary" onClick={() => setShowChat(true)}>
              Try StudyBot Chat
            </Button>
          </div>
          <div className="flex-1 bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold mb-2 text-yellow-700">Document Summarizer</h3>
            <p className="text-gray-700 mb-3">Summarize your study materials and notes quickly using our smart document summarizer.</p>
            <Button variant="secondary" asChild>
              <a
                href="/ai-tools"
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => {
                  // Optionally, sync auth/session to localStorage/sessionStorage if needed
                  // (most modern apps already persist auth tokens in localStorage/sessionStorage)
                }}
              >
                Try Document Summarizer
              </a>
            </Button>
          </div>
          {/* Popups for Chatbot and Summarizer */}
          {showChat && (
            <div ref={chatRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl" onClick={() => setShowChat(false)}>&times;</button>
                <StudyBotChat />
              </div>
            </div>
          )}
          {showSummarizer && (
            <div ref={summarizerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl" onClick={() => setShowSummarizer(false)}>&times;</button>
                <DocumentSummarizer />
              </div>
            </div>
          )}
        </div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-6">My Learning</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((enrollment) => (
            <Card key={enrollment.courseId} className="overflow-hidden">
              <div className="h-32 overflow-hidden">
                <img
                  src={enrollment.course.thumbnail}
                  alt={enrollment.course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {enrollment.course.title}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {Math.round(enrollment.progress * 100)}% Complete
                  </Badge>
                </div>
                <CardDescription>
                  {enrollment.course.instructor.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress
                  value={enrollment.progress * 100}
                  className="h-2 mb-4"
                />
                <div className="flex justify-between mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/courses/${enrollment.courseId}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Continue
                    </Link>
                  </Button>
                  <div className="text-xs text-muted-foreground pt-2">
                    Last accessed{" "}
                    {new Date(enrollment.lastAccessedDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
        <Card className="p-6 bg-learn-light border-learn-primary/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">
                Discover new courses based on your interests
              </h3>
              <p className="text-muted-foreground">
                We've curated a selection of courses that match your learning
                preferences and previous enrollments.
              </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4">
              <Button asChild>
                <Link to="/courses">View Recommendations</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
