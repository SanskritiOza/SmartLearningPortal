import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { UserBadge } from "@/components/ui/UserBadge";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  // Dark mode state
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Always apply the 'dark' class to <html> for dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10 shadow-sm dark:shadow-none">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Book className="h-6 w-6 text-learn-primary dark:text-learn-primary" />
          <Link to="/" className="text-xl font-bold text-learn-secondary dark:text-learn-primary">
            Smart<span className="text-learn-primary">Learn</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/courses" className="nav-link flex items-center gap-1 dark:text-learn-primary dark:hover:text-yellow-400">
            <Book className="h-4 w-4 text-learn-primary dark:text-learn-primary" />
            <span>Courses</span>
          </Link>
          {isAuthenticated ? (
            <>
              {(user?.role === "instructor" || user?.role === "admin") && (
                <Link 
                  to={user.role === "admin" ? "/admin" : "/instructor"}
                  className="nav-link dark:text-learn-primary dark:hover:text-yellow-400"
                >
                  {user.role === "admin" ? "Admin Dashboard" : "Instructor Dashboard"}
                </Link>
              )}
            </>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent dark:border-gray-700"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71-.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M6.34 6.34l-.71-.71" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-learn-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            )}
          </button>
          <button
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent dark:border-gray-700"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-learn-primary" />
            {/* You can add a red dot or badge for unread notifications here */}
          </button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-learn-primary/50 transition-all dark:bg-gray-800 dark:border-gray-700">
                  {/* Show only S, A, or I for student, admin, instructor */}
                  <AvatarFallback className="bg-learn-primary text-white dark:bg-gray-700 dark:text-yellow-400">
                    {user?.role === "student" ? "S" : user?.role === "admin" ? "A" : user?.role === "instructor" ? "I" : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2"><UserBadge role={user?.role} /></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dark:bg-gray-900 dark:border-gray-700 dark:text-learn-primary">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground dark:text-gray-400">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground mt-1 capitalize dark:text-gray-400">
                      {user?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem asChild className="dark:hover:bg-gray-800 dark:text-learn-primary">
                  <Link to="/dashboard" className="cursor-pointer w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="dark:hover:bg-gray-800 dark:text-learn-primary">
                  <Link to="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400 dark:hover:bg-gray-800"
                  onClick={logout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm" className="dark:text-learn-primary dark:hover:text-yellow-400">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="dark:bg-yellow-400 dark:text-learn-primary dark:hover:bg-yellow-500">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
