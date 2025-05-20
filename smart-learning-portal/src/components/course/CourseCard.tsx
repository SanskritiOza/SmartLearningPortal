import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Course } from "@/types/course";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState } from "react";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  // Example tags/categories for demonstration
  const tags = (course as any).tags || ["General"];

  // Add a simple bookmark state for demonstration
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card className="course-card overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.status === "pending" && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-yellow-100 text-yellow-800">
            Pending Approval
          </Badge>
        )}
      </div>
      <CardContent className="p-4 flex-1">
        <Link to={`/courses/${course.id}`}>
          <h3 className="text-lg font-medium text-learn-secondary line-clamp-2 hover:text-learn-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {course.instructor.name}
        </p>
        <p className="text-sm text-gray-500 mt-3 line-clamp-3">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
        <div className="flex items-center">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({course.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked((b) => !b)}
            className={`text-xs px-2 py-1 rounded-full border transition-colors ${bookmarked ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-yellow-50'}`}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Course'}
          >
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <div className="text-xs text-gray-500">
            {course.enrolledCount.toLocaleString()} students
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
