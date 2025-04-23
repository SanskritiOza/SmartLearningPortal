
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, Search, User } from "lucide-react";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Book className="h-6 w-6 text-learn-primary" />
          <Link to="/" className="text-xl font-bold text-learn-secondary">
            Smart<span className="text-learn-primary">Learn</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/courses" className="nav-link flex items-center gap-1">
            <Book className="h-4 w-4" />
            <span>Courses</span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/search" className="nav-link flex items-center gap-1">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
              
              {(user?.role === "instructor" || user?.role === "admin") && (
                <Link 
                  to={user.role === "admin" ? "/admin" : "/instructor"}
                  className="nav-link"
                >
                  {user.role === "admin" ? "Admin Dashboard" : "Instructor Dashboard"}
                </Link>
              )}
            </>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-learn-primary/50 transition-all">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-learn-primary text-white">
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground mt-1 capitalize">
                      {user?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:text-red-500"
                  onClick={logout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
