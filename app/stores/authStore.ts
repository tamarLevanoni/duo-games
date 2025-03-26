import { create } from "zustand";
// import { signIn, signOut } from "../lib/auth";
import { getSession, signIn, signOut } from "next-auth/react"

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  login: (email?: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,

  // התחברות
  login: async (email) => {
    console.log("Login with email:", email);
    if(!email){
        const session = await getSession(); // מקבל את הנתונים מה-Session
        if(session?.user){
          set({ isLoggedIn: true });
          return true;
        }
        return false;
    }
    const response = await signIn("credentials", {
      email,
      redirect: false,
    });

    if (!response||response?.error) {
      console.error("Login failed:", response?.error);
      return false;
    }

    // const { data: session, status } = useSession();
    // if (!session) {
    //   console.error("Session not found");
    //   return false;
    // }

    // const token = session?.user?.token; // NextAuth מוסיף את זה אם מוגדר נכון

    set({ isLoggedIn: true });
    return true;
  },

  // התנתקות
  logout: () => {
    // localStorage.removeItem("token");
    signOut();
    set({ isLoggedIn: false, token: null });
  },
}));
