
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MessageSquare, Pin } from "lucide-react";
import { ForumThread } from "@/types/course";

interface ForumListProps {
  threads: ForumThread[];
  courseId: string;
}

export const ForumList = ({ threads, courseId }: ForumListProps) => {
  const sortedThreads = [...threads].sort((a, b) => {
    // Sort by pinned status first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then sort by date (most recent first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Discussion Forum</h2>
        <Button asChild>
          <Link to={`/courses/${courseId}/forum/new`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Thread
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {sortedThreads.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No discussions yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to start a discussion in this course.
            </p>
            <Button asChild>
              <Link to={`/courses/${courseId}/forum/new`}>
                Start a New Thread
              </Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {sortedThreads.map((thread) => (
              <div key={thread.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${thread.author.id}`} />
                    <AvatarFallback>
                      {thread.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Link 
                        to={`/courses/${courseId}/forum/${thread.id}`}
                        className="text-lg font-medium hover:text-learn-primary transition-colors"
                      >
                        {thread.title}
                      </Link>
                      {thread.isPinned && (
                        <Badge variant="outline" className="ml-2 border-yellow-300">
                          <Pin className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <span>By {thread.author.name}</span>
                        <Badge variant="outline" className="h-5 px-1.5 text-xs capitalize">
                          {thread.author.role}
                        </Badge>
                      </div>
                      <span>•</span>
                      <span>
                        {new Date(thread.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {thread.replies} {thread.replies === 1 ? "reply" : "replies"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
