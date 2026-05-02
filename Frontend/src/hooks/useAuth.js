import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// =============================================
// CUSTOM HOOK — Shortcut hai
// Har jagah useContext(AuthContext) likhne ki
// jagah sirf useAuth() likhenge
// =============================================
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default useAuth;
