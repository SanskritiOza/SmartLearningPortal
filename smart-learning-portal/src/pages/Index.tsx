import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { StudyBotChat } from "@/components/chat/StudyBotChat";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlock Your Learning Potential
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl">
            Join SmartLearn, the AI-powered learning platform that adapts to your needs and helps you achieve your educational goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg">
              <Link to="/courses">Browse Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/register">Sign Up Free</Link>
            </Button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-5xl">
            <img 
              src="/placeholder.svg" 
              alt="Platform preview" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-12">Why Choose SmartLearn?</h2>
              <div className="grid gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 bg-learn-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-learn-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Personalized Learning</h3>
                  <p className="text-gray-600">
                    AI-powered recommendations to match your learning style and goals.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 bg-learn-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-learn-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
                  <p className="text-gray-600">
                    Learn from industry professionals with real-world experience.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 bg-learn-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-learn-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Interactive Content</h3>
                  <p className="text-gray-600">
                    Engage with multimedia lessons, quizzes, and discussions.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-12">Try Our AI Study Assistant</h2>
              <StudyBotChat />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-learn-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-learn-secondary hover:bg-gray-100">
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Web Development Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The personalized learning path helped me focus on exactly what I needed to learn. I was able to land my dream job after just 3 months!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chang</h4>
                  <p className="text-sm text-gray-500">Data Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI-generated summaries of complex topics made studying so much more efficient. I could review key concepts quickly before exams."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">Digital Marketing Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The community aspect of SmartLearn made all the difference. Getting feedback from peers and instructors helped me improve rapidly."
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;