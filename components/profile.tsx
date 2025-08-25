import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { User } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";

interface ProfileBox {
  sidebarCollapsed: boolean;
  isDarkMode: boolean;
}

export function Profile({ sidebarCollapsed, isDarkMode }: ProfileBox) {
  const { user, isLoaded } = useUser();

  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect to sign-in page after sign out
      window.location.href = "/sign-in";
    } catch (err) {
      console.error("Error during sign out:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "transition-all duration-300 rounded-xl shadow-md hover:shadow-lg backdrop-blur-md",
            sidebarCollapsed
              ? "w-10 h-10 p-0"
              : "px-3 h-10 flex items-center gap-2 font-medium",
            isDarkMode
              ? "text-white bg-gray-900/40 hover:bg-gray-800/70"
              : "text-black bg-white/70 hover:bg-gray-200/90"
          )}
        >
          <User className="w-5 h-5" />
          {!sidebarCollapsed && <span>Profile</span>}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "flex flex-col items-center justify-center text-center rounded-xl border shadow-2xl backdrop-blur-xl p-8 gap-6",
          isDarkMode
            ? "bg-neutral-900/90 text-gray-100 border-white/10"
            : "bg-white/80 text-gray-900 border-gray-200"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Your Profile</DialogTitle>
        </DialogHeader>

        {!isLoaded ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            <span className="text-sm font-medium">Loading...</span>
          </div>
        ) : (
          <>
            {/* Profile Image */}
            <img
              src={user?.imageUrl || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md border-2 border-primary/50"
            />

            {/* Name */}
            <h2 className="text-lg font-semibold">{user?.fullName}</h2>

            {/* Email */}
            <p className="text-sm opacity-80">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </>
        )}

        {/* Logout Button */}
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="mt-6 w-full rounded-xl py-2 font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
        >
          Log Out
        </Button>
      </DialogContent>
    </Dialog>
  );
}
