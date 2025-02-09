// next-auth.d.ts
import { Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session extends NextAuthSession {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string; // Trường accessToken bạn đã thêm
    };
    expires: string; // Đảm bảo trường expires có mặt
  }
}
