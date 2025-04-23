
import { Layout } from "@/components/layout/Layout";
import { CourseListing } from "@/components/course/CourseListing";

const CoursesPage = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Browse Courses</h1>
          <CourseListing />
        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
