
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Clock, 
  FileText, 
  ListChecks,
  Mail,
  Building,
  User
} from "lucide-react";
import { CourseDetails, Lecturer } from "@/types/course";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UnitInformationProps {
  course: CourseDetails;
}

export const UnitInformation = ({ course }: UnitInformationProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Unit Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <GraduationCap className="h-5 w-5 mr-2 mt-0.5 text-learn-primary" />
                <div>
                  <p className="font-medium">Credit Points</p>
                  <p className="text-muted-foreground">{course.creditPoints || 10} CP</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-learn-primary" />
                <div>
                  <p className="font-medium">Contact Hours</p>
                  <p className="text-muted-foreground">{course.contactHours || 40} hours</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium flex items-center mb-2">
                <BookOpen className="h-5 w-5 mr-2 text-learn-primary" />
                Learning Outcomes
              </h3>
              <ul className="ml-8 list-disc text-muted-foreground space-y-1">
                {(course.learningOutcomes || [
                  "Understand core concepts and principles",
                  "Apply theoretical knowledge to practical scenarios",
                  "Analyze and evaluate complex problems",
                  "Communicate findings clearly and effectively"
                ]).map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium flex items-center mb-2">
                <ListChecks className="h-5 w-5 mr-2 text-learn-primary" />
                Prerequisites
              </h3>
              <ul className="ml-8 list-disc text-muted-foreground space-y-1">
                {(course.requirements || [
                  "Completed introductory courses in the subject",
                  "Basic understanding of the field",
                  "Academic writing skills"
                ]).map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="syllabus" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="prose max-w-none">
                <h3>Course Syllabus</h3>
                <p>
                  {course.syllabus || 
                    `This course provides a comprehensive introduction to the core concepts and practices of the subject. 
                    The curriculum is designed to build both theoretical understanding and practical skills.
                    
                    Weekly sessions will alternate between lectures, tutorials, and hands-on workshops. 
                    Students are expected to complete assigned readings before each class and actively participate in discussions.
                    
                    The course is structured to progressively build competence from foundational knowledge to advanced applications.`
                  }
                </p>
                
                <h4>Weekly Schedule</h4>
                <ol>
                  <li><strong>Week 1:</strong> Introduction and Core Concepts</li>
                  <li><strong>Week 2:</strong> Theoretical Frameworks</li>
                  <li><strong>Week 3:</strong> Practical Applications</li>
                  <li><strong>Week 4:</strong> Case Studies and Analysis</li>
                  <li><strong>Week 5:</strong> Advanced Techniques</li>
                  <li><strong>Week 6:</strong> Contemporary Issues</li>
                  <li><strong>Week 7:</strong> Research Methods</li>
                  <li><strong>Week 8:</strong> Integration and Synthesis</li>
                  <li><strong>Week 9:</strong> Project Development</li>
                  <li><strong>Week 10:</strong> Presentations and Review</li>
                </ol>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="assessments" className="mt-4">
            <div className="space-y-4">
              {(course.assessments || [
                {
                  id: "1",
                  title: "Mid-term Quiz",
                  description: "Online quiz covering weeks 1-5",
                  dueDate: "2025-06-10T00:00:00Z",
                  totalMarks: 20,
                  weight: 20,
                  type: "quiz",
                  status: "upcoming"
                },
                {
                  id: "2",
                  title: "Research Assignment",
                  description: "2000-word research paper on a selected topic",
                  dueDate: "2025-07-15T00:00:00Z",
                  totalMarks: 30,
                  weight: 30,
                  type: "assignment",
                  status: "upcoming"
                },
                {
                  id: "3",
                  title: "Final Examination",
                  description: "Comprehensive exam covering all course material",
                  dueDate: "2025-08-20T00:00:00Z",
                  totalMarks: 50,
                  weight: 50,
                  type: "exam",
                  status: "upcoming"
                }
              ]).map((assessment) => (
                <Card key={assessment.id} className="overflow-hidden">
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{assessment.title}</h3>
                        <Badge 
                          className={`ml-3 ${
                            assessment.status === "upcoming" ? "bg-blue-100 text-blue-800" :
                            assessment.status === "open" ? "bg-green-100 text-green-800" :
                            assessment.status === "closed" ? "bg-orange-100 text-orange-800" :
                            "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {assessment.status || "Upcoming"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{assessment.description}</p>
                      <div className="flex items-center mt-3 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-muted-foreground">
                          Due: {new Date(assessment.dueDate).toLocaleDateString()}
                        </span>
                        <FileText className="h-4 w-4 ml-4 mr-1" />
                        <span className="text-muted-foreground">
                          Worth: {assessment.weight}% ({assessment.totalMarks} marks)
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lecturers" className="mt-4">
            <div className="space-y-6">
              {(course.lecturers || [
                {
                  id: "1",
                  name: "Dr. Taylor Johnson",
                  title: "Associate Professor",
                  email: "t.johnson@university.edu",
                  office: "Building A, Room 305",
                  officeHours: "Tuesdays 14:00-16:00, Thursdays 10:00-12:00",
                  bio: "Dr. Johnson specializes in advanced theories and applications. With 15 years of experience in both academia and industry, they bring practical insights to complex theoretical concepts.",
                  avatar: "https://i.pravatar.cc/150?img=60"
                },
                {
                  id: "2",
                  name: "Dr. Morgan Rivera",
                  title: "Assistant Professor",
                  email: "m.rivera@university.edu",
                  office: "Building B, Room 112",
                  officeHours: "Mondays 09:00-11:00, Wednesdays 13:00-15:00",
                  bio: "Dr. Rivera's research focuses on emerging trends and innovative approaches. They have published extensively in leading journals and regularly present at international conferences.",
                  avatar: "https://i.pravatar.cc/150?img=32"
                }
              ]).map((lecturer: Lecturer) => (
                <div key={lecturer.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-20 w-20 border-2 border-white shadow">
                    <AvatarImage src={lecturer.avatar} />
                    <AvatarFallback>{lecturer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{lecturer.name}</h3>
                    <p className="text-muted-foreground">{lecturer.title}</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-learn-primary" />
                        <span>{lecturer.email}</span>
                      </div>
                      
                      {lecturer.office && (
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-learn-primary" />
                          <span>{lecturer.office}</span>
                        </div>
                      )}
                      
                      {lecturer.officeHours && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-learn-primary" />
                          <span>{lecturer.officeHours}</span>
                        </div>
                      )}
                    </div>
                    
                    {lecturer.bio && (
                      <p className="mt-3 text-sm">{lecturer.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
