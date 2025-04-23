
import { Layout } from "@/components/layout/Layout";
import { NoteSummarizer } from "@/components/ai/NoteSummarizer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const AiToolsPage = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="py-8 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">AI Learning Tools</h1>
            <NoteSummarizer />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AiToolsPage;
