
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { toast } from "sonner";

export async function loginWithEmailAndPassword(email: string, password: string): Promise<User | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully");
    return userCredential.user;
  } catch (error: any) {
    console.error("Login error:", error);
    const errorMessage = error.message || "Failed to login";
    toast.error(errorMessage);
    return null;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    await signOut(auth);
    toast.success("Logged out successfully");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to logout");
    return false;
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
