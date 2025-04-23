
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-learn-dark text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-learn-primary" />
              <span className="text-xl font-bold">
                Smart<span className="text-learn-primary">Learn</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering education through technology. Our platform makes learning
              accessible, engaging, and effective for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/courses" className="hover:text-learn-primary transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/courses?category=web" className="hover:text-learn-primary transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=data" className="hover:text-learn-primary transition-colors">
                  Application Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=mobile" className="hover:text-learn-primary transition-colors">
                Artificial Intelligence
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/login" className="hover:text-learn-primary transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-learn-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-learn-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-learn-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/help" className="hover:text-learn-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-learn-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-learn-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-learn-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SmartLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
