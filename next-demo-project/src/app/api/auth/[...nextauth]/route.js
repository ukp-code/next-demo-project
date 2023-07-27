import User from "@/models/User"
import connect from "@/utils/db"
import NextAuth from "next-auth/next"
import bcrypt from 'bcrypt'
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                await connect()

                try {
                    const user = User.findOne({
                        email: credentials.email
                    })
                    if (user) {
                        return user
                        // const checkPassword = await bcrypt.compare(credentials.password, user.password)
                        // if (checkPassword) {
                        //     return user
                        // } else {
                        //     throw new Error("Wrong Credentials!")
                        // }
                    } else {
                        throw new Error("User not found")
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        GithubProvider()
    ],
    pages: {
        error: "/dashboard/login"
    }
})

export { handler as GET, handler as POST }