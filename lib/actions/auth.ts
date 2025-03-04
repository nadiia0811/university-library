// server actions
"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";



export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
        email, password, redirect: false });

    if (result?.error) {
        return { success: false, error: result.error}
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Signin error" };
  }
};


export const signUp = async (params: AuthCredentials) => {
  const { fullName, 
          email, 
          password, 
          universityId, 
          universityCard } = params;

  //check if user exists
  const existingUser = await db.select()  //array with 1 object
                               .from(users)
                               .where(eq(users.email, email))
                               .limit(1);

  if (existingUser.length > 0) {
    return { success: false, 
             error: "User already exists"
            };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users)    //sign-up
            .values( {
                fullName, 
                email, 
                password: hashedPassword, 
                universityId, 
                universityCard });

    await signInWithCredentials({ email, password }); //sign-in

    return { success: true };
    
  } catch (error) {
    console.log(error, "Signup error");
    return { 
        success: false,
        error: "Signup error"
    };
  }
};