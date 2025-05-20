import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface UserBadgeProps {
  role: string;
}

export const UserBadge: FC<UserBadgeProps> = ({ role }) => {
  let color = "bg-blue-100 text-blue-800";
  let label = "User";
  if (role === "student") {
    color = "bg-green-100 text-green-800";
    label = "Student";
  } else if (role === "instructor") {
    color = "bg-purple-100 text-purple-800";
    label = "Instructor";
  } else if (role === "admin") {
    color = "bg-red-100 text-red-800";
    label = "Admin";
  }
  return (
    <span className="inline-flex items-center gap-2">
      {/* Profile pic or fallback (parent should provide) */}
      {/* UserBadge label and dot */}
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-transparent bg-opacity-80">
        <span className={`w-2 h-2 rounded-full mr-1 ${color.split(" ")[0]}`}></span>
        <span className={`text-xs font-semibold ${color.split(" ")[1]}`}>
          {label}
        </span>
      </span>
    </span>
  );
};
