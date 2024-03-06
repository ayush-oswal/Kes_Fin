import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'

import User from "@/models/user"
import ConnectDB from "@/utils/database"


const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks : {
        async session({session}){
            const sessionUser = await User.findOne({ email : session.user.email });
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ account, profile, user, credentials }){
            await ConnectDB();
            try{
                const exists = await User.findOne({ email : profile.email });
                if(!exists){
                    await User.create({
                        email : profile.email,
                        name : profile.name
                    })
                }
                return true
            }
            catch(err){
                console.log(err)
                return false
            }
        }
    }
})

export { handler as GET , handler as POST }