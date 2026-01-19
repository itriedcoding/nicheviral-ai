// Simple session management
export function getSession() {
  if (typeof window === "undefined") return null;
  
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  if (!userId || !userEmail) {
    return null;
  }

  return { userId, userEmail };
}

export function setSession(userId: string, userEmail: string) {
  localStorage.setItem("userId", userId);
  localStorage.setItem("userEmail", userEmail);
  // Dispatch event to notify hooks
  window.dispatchEvent(new Event('auth-change'));
}

export function clearSession() {
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  window.dispatchEvent(new Event('auth-change'));
}

export function isAuthenticated() {
  return getSession() !== null;
}