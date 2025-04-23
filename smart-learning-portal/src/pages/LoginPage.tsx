
import { Layout } from "@/components/layout/Layout";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Sign In to SmartLearn</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
