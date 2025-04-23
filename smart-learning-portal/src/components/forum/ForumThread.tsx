
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ForumPost } from "@/types/course";
import { MessageSquare, ThumbsUp, Flag, Bookmark, Pin, Reply, Check, File, Paperclip } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface ForumThreadProps {
  threadId: string;
  title: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  content: string;
  isPinned: boolean;
  posts: ForumPost[];
  courseId: string;
}

export const ForumThread = ({
  threadId,
  title,
  author,
  createdAt,
  content,
  isPinned,
  posts,
  courseId
}: ForumThreadProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [replyText, setReplyText] = useState("");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  const handleReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty reply",
        description: "Please write something before submitting",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to post the reply
    toast({
      title: "Reply submitted",
      description: "Your reply has been posted successfully"
    });
    
    setReplyText("");
  };
  
  const isInstructor = user?.role === "instructor" || user?.role === "admin";
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>Discussion thread</span>
            {isPinned && (
              <Badge variant="outline" className="ml-3 border-yellow-300">
                <Pin className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                Pinned by instructor
              </Badge>
            )}
          </div>
        </div>
        {isInstructor && (
          <Button variant="outline" size="sm">
            <Pin className="h-4 w-4 mr-2" />
            {isPinned ? "Unpin Thread" : "Pin Thread"}
          </Button>
        )}
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage src={author.avatar || `https://i.pravatar.cc/150?img=${author.id}`} />
              <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <span className="font-medium">{author.name}</span>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {author.role}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                  {formatDate(createdAt)}
                </span>
              </div>
              <div className="mt-4 prose max-w-none">
                <p>{content}</p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Replies</h2>
          <Badge className="ml-2">{posts.length}</Badge>
        </div>
        
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={post.author.avatar || `https://i.pravatar.cc/150?img=${post.author.id}`} />
                      <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                          <span className="font-medium">{post.author.name}</span>
                          <Badge variant="outline" className="ml-2 capitalize">
                            {post.author.role}
                          </Badge>
                          {post.isAnswer && (
                            <Badge className="ml-2 bg-green-100 text-green-800 border-0">
                              <Check className="h-3 w-3 mr-1" />
                              Best Answer
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <div className="mt-4 prose max-w-none">
                        <p>{post.content}</p>
                      </div>
                      
                      {post.attachments && post.attachments.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <div className="text-sm font-medium mb-2 flex items-center">
                            <Paperclip className="h-4 w-4 mr-1" />
                            Attachments
                          </div>
                          <div className="space-y-2">
                            {post.attachments.map(attachment => (
                              <div key={attachment.id} className="flex items-center text-sm">
                                <File className="h-4 w-4 mr-2 text-muted-foreground" />
                                <a href={attachment.url} className="text-learn-primary hover:underline">
                                  {attachment.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4 mr-1" />
                          Quote
                        </Button>
                        {isInstructor && !post.isAnswer && (
                          <Button variant="ghost" size="sm">
                            <Check className="h-4 w-4 mr-1" />
                            Mark as Answer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-8">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <h3 className="font-medium mb-1">No replies yet</h3>
              <p className="text-muted-foreground">Be the first to reply to this discussion</p>
            </div>
          </Card>
        )}
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-3">Post a Reply</h3>
        <Textarea 
          placeholder="Write your reply here..." 
          className="min-h-[150px] mb-3"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Paperclip className="h-4 w-4 mr-2" />
            Attach File
          </Button>
          <Button onClick={handleReply}>
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
