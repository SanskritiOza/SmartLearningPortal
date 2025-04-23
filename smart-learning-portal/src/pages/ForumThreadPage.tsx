
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ForumThread } from "@/components/forum/ForumThread";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock forum thread data with some sample posts
const MOCK_FORUM_THREAD = {
  id: "1",
  title: "Question about Module 2 Content",
  author: {
    id: "1",
    name: "Alex Student",
    role: "student",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  createdAt: "2025-03-10T15:30:00Z",
  content: "I'm having trouble understanding the concept explained in Lesson 3 of Module 2. Can someone provide an example of how this would be applied in a real-world scenario? I've tried looking at the textbook but the explanation there seems quite abstract.",
  isPinned: false,
  posts: [
    {
      id: "2",
      threadId: "1",
      content: "The concept in Lesson 3 can be applied in many ways. For example, in software development, you would use this approach when designing system architecture to ensure scalability. Does that help clarify things?",
      author: {
        id: "2",
        name: "Taylor Teacher",
        role: "instructor",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      createdAt: "2025-03-10T16:45:00Z",
      isAnswer: true
    },
    {
      id: "3",
      threadId: "1",
      content: "I had the same question! Thanks for the explanation, Professor. I found this article online that might help too.",
      author: {
        id: "4",
        name: "Jordan Smith",
        role: "student",
        avatar: "https://i.pravatar.cc/150?img=4"
      },
      createdAt: "2025-03-11T09:15:00Z",
      attachments: [
        {
          id: "1",
          name: "helpful-article.pdf",
          url: "#"
        }
      ]
    }
  ]
};

const ForumThreadPage = () => {
  const { courseId, threadId } = useParams<{ courseId: string, threadId: string }>();
  const [threadData, setThreadData] = useState(MOCK_FORUM_THREAD);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the actual thread data from an API
    // For now, we're using mock data
    setThreadData(MOCK_FORUM_THREAD);
    setIsLoading(false);
  }, [courseId, threadId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link to={`/courses/${courseId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
            </Button>
          </div>
          
          <ForumThread
            threadId={threadData.id}
            title={threadData.title}
            author={threadData.author}
            createdAt={threadData.createdAt}
            content={threadData.content}
            isPinned={threadData.isPinned}
            posts={threadData.posts}
            courseId={courseId || ""}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ForumThreadPage;
