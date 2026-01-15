import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user}) {
        try {
            if (!user.email) {
                return false;
            }
            const existinguser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!existinguser) {
                await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        profileImage: user.image,
                    },
                });
            }
            return true;
        } catch (error) {
            console.log("Internel Server Error:", error);
            return false;
        }
    },
  },
};