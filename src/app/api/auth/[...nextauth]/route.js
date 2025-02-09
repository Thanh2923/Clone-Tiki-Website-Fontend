import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Hàm xử lý NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        });

        if (!res.ok) throw new Error("Invalid credentials");

        const user = await res.json();

        // Trả về thông tin user và accessToken
        return {
          accessToken: user.accessToken,
          id: user.user.id,
          email: user.user.email,
          role: user.user.role,
        };
      }
    })
  ],
  callbacks: {
    // Callback để thêm thông tin vào JWT
    async jwt({ token, user }) {
      if (user) {
        // Lưu thông tin vào token khi user đăng nhập
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          email: user.email,
          role: user.role
        };
      }
      return token;
    },
    // Callback để thêm thông tin vào session từ token
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.user.id;
        session.user.email = token.user.email;
        session.user.role = token.user.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
