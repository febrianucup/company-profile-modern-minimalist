import { Link } from "react-router-dom";
import { LayoutDashboard, LogIn } from "lucide-react";

import { useAuth } from "../lib/auth";
import { Button } from "./ui/Button";

/**
 * Navbar entry point to the admin area:
 * "Masuk" when signed out, "Dashboard" when a session exists.
 */
export function AuthButton({ className, size = "sm", onNavigate }) {
  const session = useAuth();

  if (session) {
    return (
      <Button
        as={Link}
        to="/admin"
        size={size}
        variant="subtle"
        className={className}
        onClick={onNavigate}
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Button>
    );
  }

  return (
    <Button
      as={Link}
      to="/login"
      size={size}
      variant="outline"
      className={className}
      onClick={onNavigate}
    >
      <LogIn className="h-4 w-4" />
      Masuk
    </Button>
  );
}
