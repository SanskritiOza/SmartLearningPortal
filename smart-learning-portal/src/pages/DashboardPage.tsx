
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { InstructorDashboard } from "@/components/dashboard/InstructorDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case "student":
        return <StudentDashboard />;
      case "instructor":
        return <InstructorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="py-8 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            {renderDashboard()}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
