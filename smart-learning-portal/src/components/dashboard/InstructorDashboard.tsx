import { useEffect, useState } from "react";
import { getMockInstructorCourses } from "@/services/mockData";
import { Course } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PlusCircle, BookOpen, Settings, Edit } from "lucide-react";
import { DocumentSummarizer } from "@/components/chat/DocumentSummarizer";

export const InstructorDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getMockInstructorCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching instructor courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="bg-gray-100 h-20"></CardHeader>
            <CardContent className="pt-6">
              <div className="h-4 bg-gray-100 rounded mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">Rejected</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Courses</h2>
        <Button asChild>
          <Link to="/create-course">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't created any courses yet. Start creating your first
              course now.
            </p>
            <Button asChild>
              <Link to="/create-course">Create Your First Course</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  {renderStatusBadge(course.status)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.enrolledCount} enrolled
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/courses/${course.id}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to={`/edit-course/${course.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/course-settings/${course.id}`}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6">Analytics Overview</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {courses.reduce(
                  (total, course) => total + course.enrolledCount,
                  0
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {courses.length > 0
                  ? (
                      courses.reduce(
                        (total, course) => total + course.rating,
                        0
                      ) / courses.length
                    ).toFixed(1)
                  : "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                Based on {courses.reduce(
                  (total, course) => total + course.reviewCount,
                  0
                )}{" "}
                reviews
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">76%</p>
              <p className="text-sm text-muted-foreground">
                Average completion rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 rounded-lg p-6 shadow">
          <h3 className="text-lg font-bold mb-2 text-yellow-700">Document Summarizer</h3>
          <p className="text-gray-700 mb-3">Summarize your teaching materials, notes, or resources quickly using our smart document summarizer.</p>
          <DocumentSummarizer />
        </div>
      </div>
    </div>
  );
};
