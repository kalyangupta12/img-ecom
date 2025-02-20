import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {
                if(!credentials?.email||!credentials?.password){
                    throw new Error("Invalid credentials");
                }

                try {
                    await connectToDatabase();
                    const user = await User.findOne({email: credentials.email})
                    if(!user){
                        throw new Error("No user found wit this email");
                    }
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if(!isValid){
                        throw new Error("Invalid Password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role
                    }
                }catch(err){
                    console.log("Auth Error",err);
                    throw err;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }){
            if(user) {
                token.id = user.id as string;
                token.role = user.role as string;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;

            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
};