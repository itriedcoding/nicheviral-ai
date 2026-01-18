import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, LogIn, LogOut } from "lucide-react";
import { getSession, clearSession } from "@/lib/auth";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  const session = getSession();

  const handleSignOut = () => {
    clearSession();
    navigate("/");
  };

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

          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </motion.nav>
  );
}
