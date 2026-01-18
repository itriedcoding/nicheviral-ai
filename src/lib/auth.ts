// Simple session management
export function getSession() {
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
}

export function clearSession() {
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
}

export function isAuthenticated() {
  return getSession() !== null;
}
