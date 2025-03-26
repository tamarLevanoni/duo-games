// types/next-auth.d.ts

import NextAuth from "next-auth";

// הרחבת ה- session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: Role;
      token: string; // אם אתה רוצה לשמור את הטוקן במפורש
    };
  }

  // הרחבת ה- JWT
  interface JWT {
    id: string;
    email: string;
    role?: Role;
    token: string;
  }
}

// טיפוס עבור ה-role אם זה אובייקט
interface Role {
    isAdmin: boolean;
    isManager: boolean;
    isLeader: boolean;
  }
