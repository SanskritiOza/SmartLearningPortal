
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { User, UserRole, AuthState } from "@/types/user";

// Mock data for local development
const MOCK_USERS = [
  {
    id: "1",
    email: "student@example.com",
    password: "password",
    name: "Alex Student",
    role: "student" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    email: "instructor@example.com",
    password: "password",
    name: "Taylor Teacher",
    role: "instructor" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "password",
    name: "Sam Admin",
    role: "admin" as UserRole,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
        isLoading: false,
      });
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
      throw new Error("Invalid credentials");
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    // Check if user already exists
    if (MOCK_USERS.some((u) => u.email === email)) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Email already in use. Please use another email.",
      });
      throw new Error("Email already exists");
    }

    // In a real app, this would be an API call to register the user
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      role,
      avatar: `https://i.pravatar.cc/150?img=${MOCK_USERS.length + 10}`,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    toast({
      title: "Registration successful",
      description: `Welcome to Smart Learning, ${name}!`,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
