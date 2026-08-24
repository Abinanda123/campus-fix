import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, PenLine, Shield } from "lucide-react";

const links = [
  { to: "/", label: "Issues", icon: AlertTriangle },
  { to: "/report", label: "Report Issue", icon: PenLine },
  { to: "/admin/login", label: "Admin", icon: Shield },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          CampusFix
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive =
              to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(to);

            return (
              <Button
                key={to}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={to} className={cn("gap-1.5", isActive && "font-semibold")}>
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
