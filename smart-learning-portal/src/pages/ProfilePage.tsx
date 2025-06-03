import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-12">You are not logged in.</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border bg-learn-primary text-white flex items-center justify-center text-4xl">
              {user.role === "student"
                ? "S"
                : user.role === "admin"
                ? "A"
                : user.role === "instructor"
                ? "I"
                : "U"}
            </div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
            <div className="capitalize text-sm text-gray-400 flex items-center gap-2">
              {/* Only show one user role, formatted nicely */}
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
