
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Assessment, StudentGrade } from "@/types/course";
import { Calendar, ClipboardCheck, AlertCircle } from "lucide-react";

interface CourseGradesProps {
  grades: StudentGrade[];
  courseId: string;
}

export const CourseGrades = ({ grades, courseId }: CourseGradesProps) => {
  // Calculate total course grade based on assessment weights
  const calculateTotalGrade = () => {
    if (grades.length === 0) return { grade: 0, outOf: 0 };

    let totalWeight = 0;
    let weightedScore = 0;
    
    grades.forEach(grade => {
      // Only include graded assessments
      if (grade.status === "graded") {
        totalWeight += grade.assessment.weight;
        weightedScore += (grade.grade / grade.assessment.totalMarks) * grade.assessment.weight;
      }
    });
    
    // Get overall percentage if there are graded assessments
    const finalGrade = totalWeight > 0 ? (weightedScore / totalWeight) * 100 : 0;
    
    return {
      grade: Math.round(finalGrade * 10) / 10, // Round to 1 decimal place
      outOf: 100
    };
  };

  const totalGrade = calculateTotalGrade();

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeStatus = (status: string) => {
    switch (status) {
      case "graded":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <ClipboardCheck className="h-3 w-3 mr-1" /> 
            Graded
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Calendar className="h-3 w-3 mr-1" /> 
            Pending
          </Badge>
        );
      case "not submitted":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" /> 
            Not Submitted
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Course Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Overall Grade</p>
              <p className={`text-2xl font-bold ${getGradeColor(totalGrade.grade)}`}>
                {totalGrade.grade}%
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground mb-1">Progress</p>
              <Progress value={totalGrade.grade} className="h-3" />
            </div>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.length > 0 ? (
              grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.assessment.title}</TableCell>
                  <TableCell>
                    {new Date(grade.assessment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{grade.assessment.weight}%</TableCell>
                  <TableCell>
                    {grade.status === "graded" ? (
                      <span className={getGradeColor((grade.grade / grade.assessment.totalMarks) * 100)}>
                        {grade.grade}/{grade.assessment.totalMarks}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getGradeStatus(grade.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No grades available yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
