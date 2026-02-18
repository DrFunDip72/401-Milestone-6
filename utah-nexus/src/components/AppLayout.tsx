import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/trending", label: "Trending Topics", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 h-14 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex h-full max-w-6xl mx-auto items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm">
              UN
            </div>
            <span className="font-display font-semibold text-lg">Utah Nexus</span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === to || (to !== "/" && location.pathname.startsWith(to))
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </nav>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Slide-out menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-72 bg-card border-l border-border shadow-xl md:hidden",
              "flex flex-col gap-4 p-6 pt-20",
              "transition-transform duration-200"
            )}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    location.pathname === to || (to !== "/" && location.pathname.startsWith(to))
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="mt-4"
            >
              <Button className="w-full">Sign Up</Button>
            </Link>
          </aside>
        </>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
