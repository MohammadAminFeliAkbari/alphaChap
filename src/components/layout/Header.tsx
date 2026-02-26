import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuthStore";
import { useUser } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/order", label: "ثبت سفارش" },
  { href: "/pricing", label: "تعرفه‌ها" },
  { href: "/faq", label: "سوالات متداول" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();

  const { isAuthenticated, logout } = useAuth()
  const { data } = useUser()

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">آلفاچاپ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to={isAuthenticated ? '/dashboard' : '/auth'} className="hidden sm:block">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              {isAuthenticated ? "حساب کاربری" : "ورود / ثبت‌نام"}
            </Button>
          </Link>

          <Link to="/order" className="hidden md:block">
            <Button variant="accent" size="sm">
              ثبت سفارش
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {
        isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-up">
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gaP-2 mt-2 pt-2 border-t border-border">
                <Link to={isAuthenticated ? "/dashboard" : "/auth"} className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {isAuthenticated ? "حساب کاربری" : "ورود / ثبت‌نام"}
                  </Button>
                </Link>
                <Link to="/order" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="accent" className="w-full">
                    ثبت سفارش
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )
      }
    </header >
  );
};
