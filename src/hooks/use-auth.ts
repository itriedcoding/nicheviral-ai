import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { getSession } from "@/lib/auth";
import { useState, useEffect } from "react";

export function useAuth() {
  const [session, setSessionState] = useState<{ userId: string; userEmail: string } | null>(null);
  
  // Sync session from localStorage on mount and storage events
  useEffect(() => {
    const loadSession = () => {
      const s = getSession();
      setSessionState(s);
    };
    
    loadSession();
    
    window.addEventListener('storage', loadSession);
    // Custom event for immediate updates within the same window
    window.addEventListener('auth-change', loadSession);
    
    return () => {
      window.removeEventListener('storage', loadSession);
      window.removeEventListener('auth-change', loadSession);
    };
  }, []);

  const userId = session?.userId;
  
  // Fetch user details if we have a userId
  const user = useQuery(api.users.getUserById, userId ? { userId } : "skip");
  
  const isLoading = userId ? user === undefined : false;
  const isAuthenticated = !!userId;

  const signIn = () => {
    // This is handled by the Auth page, but we can expose a helper if needed
  };

  const signOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    setSessionState(null);
    window.dispatchEvent(new Event('auth-change'));
    window.location.href = "/";
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    signIn,
    signOut,
    userId // Expose userId for components to use in queries
  };
}