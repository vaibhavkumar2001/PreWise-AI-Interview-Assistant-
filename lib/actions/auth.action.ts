'use server'

import { db,auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7

// SIGNUP KE LIYE H 

export async function signUp(params: SignUpParams) {
    const { uid,name,email } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();


        if(userRecord.exists) {
            return {
                success:false,
                message: "User alreasy exists.Please sign in instead."
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: "Account created Successfully. Please sign in "
        }
    } catch (e: any) {
        console.log('Error creating a user',e)

        if(e.code === 'auth/email already in exists') {
            return {
                success: false,
                message: "This email is already in use"
            }
        }

        return {
            success: false,
            message: 'Failed to create an account'
        }
    }
}
 
// SIGNIN KE LIYE AB 
export async function signIn(params: SignInParams) {
    const { email,idToken } = params

    try {
        const userRecord = await auth.getUserByEmail(email)

        if(!userRecord) {
            return {
                success:false,
                message: 'User does not exist.Create an account instead'
            }
        }

        await setSessionCookie(idToken);
    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "Failed to log into an account"
        }
    }
}

// SESSION COOKIE GENERATE HOGA AB
export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}


