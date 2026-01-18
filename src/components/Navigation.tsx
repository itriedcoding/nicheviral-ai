import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, LogIn, LogOut, Shield, Menu, X } from "lucide-react";
import { getSession, clearSession } from "@/lib/auth";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  const session = getSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user is admin
  const isAdmin = useQuery(
    api.admin.isAdmin,
    session ? { userId: session.userId } : "skip"
  );

  const handleSignOut = () => {
    clearSession();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/integrations", label: "Integrations" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isLanding ? "glass-light" : "glass-strong"
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
              Neura AI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!session ? (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="glass hover:glass-strong">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="red-glow">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {location.pathname !== "/dashboard" && (
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="glass hover:glass-strong">
                      Dashboard
                    </Button>
                  </Link>
                )}
                {location.pathname !== "/billing" && (
                  <Link to="/billing">
                    <Button variant="outline" size="sm" className="glass hover:glass-strong">
                      Billing
                    </Button>
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="glass hover:glass-strong">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="glass hover:glass-strong"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden glass w-10 h-10 rounded-lg flex items-center justify-center"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {!session ? (
                  <>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full glass hover:glass-strong">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full red-glow">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {location.pathname !== "/dashboard" && (
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full glass hover:glass-strong">
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    {location.pathname !== "/billing" && (
                      <Link to="/billing" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full glass hover:glass-strong">
                          Billing
                        </Button>
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full glass hover:glass-strong">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="w-full glass hover:glass-strong"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
