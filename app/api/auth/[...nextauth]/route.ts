import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prismaClient";
import generateId from "@/util/idGenerator";

// http://localhost:3000/auth/error?error=Configuration

export const authoptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/login",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
    },
    adapter: PrismaAdapter(prisma),


    callbacks: {
        async signIn({ account, user }) {
            const _user = await prisma.user.findFirst({
                where: { email: user.email },
            });

            if (_user) {
                // Find or create the associated account
                const _account = await prisma.account.findFirst({
                    where: {

                        userId: _user.id
                    },
                });

                //   id                       String  @id @default(cuid())
                //   userId                   String  @unique
                //   type                     String
                //   provider                 String
                //   providerAccountId        String
                //   refresh_token            String? @db.Text
                //   access_token             String? @db.Text
                //   expires_at               Int?
                //   refresh_token_expires_in Int?
                //   token_type               String?
                //   scope                    String?
                //   id_token                 String? @db.Text
                //   session_state            String?


                if (!_account) {
                    // If the account doesn't exist, create a new one
                    const accountId = generateId();
                    await prisma.account.create({
                        data: {
                            id: accountId,
                            provider: account!.provider,
                            providerAccountId: account!.providerAccountId,
                            type: account!.type,
                            refresh_token: account?.refresh_token,
                            access_token: account?.access_token,
                            expires_at: account?.expires_at,
                            userId: _user.id,
                        },
                    });
                }

                // Allow sign in
                return true;
            }
            else {
                return false;
            }
        }
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || ``,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ``,
        }),
    ],
}

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };




// CredentialsProvider({
//     name: "Credentials",
//     credentials: {
//         username: { label: "Username", type: "text", placeholder: "vamshi" },
//         password: { label: "Password", type: "password" }
//     },

//     async authorize(credentials) {


//         if (!credentials) {
//             return null;
//         }

//         const username = credentials.username;
//         const password = credentials.password;

//         console.log({
//             username: username,
//             password: password,
//         });

//         const user = await prisma.user.findFirst({
//             where: { username: username },
//         });

//         if (!user || !user.password) {
//             console.log("User not found or password not set");
//             return null;
//         }

//         const isVaildPassword = await bcrypt.compare(password, user.password);

//         if (!isVaildPassword) {
//             console.log("Invalid password");
//             return null;
//         }

//         return user;
//     }

// }),