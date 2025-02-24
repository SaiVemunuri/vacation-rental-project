import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../../libs/prismadb"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"


export const authOptions={
    adapter: PrismaAdapter(prisma),
    providers: [
      GithubProvider({
          clientId:process.env.GITHUB_ID,
          clientSecret:process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
          clientId:process.env.GOOGLE_ID,
          clientSecret:process.env.GOOGLE_SECRET,
      }),
      CredentialsProvider({
          name: 'credentials',
          credentials:{
              email: { label: "Email", type: "eamil"},
             password: { label: "Password", type: "password"}
          },
          async authorize(credentials) {
            console.log(credentials)
              if(!credentials?.email || !credentials?.password ){
                  throw new Error("Invalid credentials");
              }
              const user =await prisma.user.findUnique({
                  where:{
                      email:credentials.email
                  }
              });
              if(!user || !user?.hashedPassword){
                  throw new Error("Invalid credentials");
              }
              const isCorrectPassword=await bcrypt.compare(
                  credentials.password,
                  user.hashedPassword
              );
              if(!isCorrectPassword){
                  throw new Error("Invalid credentials");
              }
              return user;
          }
      })
    ],
    
    pages:{
      signIn:"/"
    },
    debug:process.env.NODE_ENV==="development",
    session:{
      strategy:"jwt"
     },
     secret:process.env.NEXTAUTH_SECRET,
  }
  const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
