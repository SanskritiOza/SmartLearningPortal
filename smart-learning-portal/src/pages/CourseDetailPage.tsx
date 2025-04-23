
import { Layout } from "@/components/layout/Layout";
import { CourseDetail } from "@/components/course/CourseDetail";

const CourseDetailPage = () => {
  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <CourseDetail />
      </div>
    </Layout>
  );
};

export default CourseDetailPage;
