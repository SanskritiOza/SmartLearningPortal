
import { Layout } from "@/components/layout/Layout";
import { RegisterForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Account</h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
