
import { useEffect, useState } from "react";
import { getMockEnrolledCourses } from "@/services/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Book, FileText } from "lucide-react";

export const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
