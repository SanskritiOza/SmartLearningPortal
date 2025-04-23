
import { useEffect, useState } from "react";
import { getMockPendingCourses, getMockUsers } from "@/services/mockData";
import { Course } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, X, UserCog, BookOpen, PlusCircle, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AdminDashboard = () => {
  const [pendingCourses, setPendingCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, usersData] = await Promise.all([
          getMockPendingCourses(),
          getMockUsers()
        ]);
        setPendingCourses(coursesData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveCourse = (courseId: string) => {
    setPendingCourses(pendingCourses.filter(course => course.id !== courseId));
    toast({
      title: "Course Approved",
      description: "The course has been approved and is now live.",
    });
  };

  const handleRejectCourse = (courseId: string) => {
    setPendingCourses(pendingCourses.filter(course => course.id !== courseId));
    toast({
      variant: "destructive",
      title: "Course Rejected",
      description: "The course has been rejected and the instructor notified.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Card className="animate-pulse">
          <CardHeader className="bg-gray-100 h-20"></CardHeader>
          <CardContent className="pt-6">
            <div className="h-60 bg-gray-100 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{users.length}</p>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{users.filter(u => u.role === 'student').length} Students</span>
                  <span>{users.filter(u => u.role === 'instructor').length} Instructors</span>
                  <span>{users.filter(u => u.role === 'admin').length} Admins</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{pendingCourses.length}</p>
                <p className="text-sm text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Health</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">Good</p>
                <p className="text-sm text-muted-foreground">
                  All systems operational
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="max-h-80 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-2">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New course submitted</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-yellow-100 p-2">
                      <UserCog className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">User role updated</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild className="w-full justify-between">
                    <Link to="/admin/users">
                      Manage Users
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-between">
                    <Link to="/admin/courses">
                      Review Pending Courses
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-between">
                    <Link to="/admin/reports">
                      View Reports
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-between">
                    <Link to="/admin/settings">
                      Platform Settings
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pending Courses</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin/courses">
                    View All Courses
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {pendingCourses.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No courses pending approval
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            By {course.instructor.name} • Submitted{" "}
                            {new Date(course.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 w-full md:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 md:flex-initial"
                          asChild
                        >
                          <Link to={`/courses/${course.id}`}>Preview</Link>
                        </Button>
                        <Button
                          onClick={() => handleApproveCourse(course.id)}
                          size="sm"
                          className="flex-1 md:flex-initial"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectCourse(course.id)}
                          variant="destructive"
                          size="sm"
                          className="flex-1 md:flex-initial"
                        >
                          <X className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <Button asChild size="sm">
                  <Link to="/admin/add-user">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <Avatar className="mr-4">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${user.id}`} />
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'instructor' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                      }>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <Button asChild variant="ghost" size="sm">
                        <Link to={`/admin/users/${user.id}`}>
                          <UserCog className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
