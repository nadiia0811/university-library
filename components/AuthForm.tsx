"use client"

import React from 'react';
import { useForm, 
         FieldValues, 
         UseFormReturn, 
         DefaultValues, 
         SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z, ZodType } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import Link from 'next/link';
import { Path } from 'react-hook-form';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import ImageUpload from './ImageUpload';


interface Props<T extends FieldValues> {  
// T is a type for SignUp form(object with props: fullName, email, universityId, universityCard, password)
// and SignIn form(email, password)

  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{success: boolean, error?: string}>;
} 

const AuthForm  = <T extends FieldValues> ({ 
    type, 
    schema, 
    onSubmit, 
    defaultValues } : Props<T>) => {

    const isSignIn = type === "SIGN_IN";    

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
      });

    const handleSubmit: SubmitHandler<T> = async (data) => {
       console.log("hello")
    }  

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>

      <p className="text-light-100">
        {isSignIn ? "Access the vast collection of resources, and stay updated" : 
                    "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} 
              className="space-y-6 w-full">
          
          {Object.keys(defaultValues).map((field) => (  //field is a string here
            <FormField  control={form.control}
                        name={field as Path<T>}   //field is a string
                        key={field}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="capitalize">
                              {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                            </FormLabel>
                            <FormControl>
                              {field.name === "universityCard" ? <ImageUpload /> : 
                                <Input required 
                                       type={
                                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                                       }                                       
                                       {...field} 
                                       className="form-input" 
                                />
                              }                             
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
            />
          ))}
         
          <Button type="submit"
                  className="form-btn">{isSignIn ? "Sign In" : "Sign Up"}</Button>
        </form>
      </Form>
      <p className="justify-center text-base font-medium flex gap-2">
        {isSignIn ? "New to BookWise?" : "Already have an account?"}

        <Link href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-primary">
        {isSignIn ? "Create an Account" : "Sign In"}
      </Link>
      </p>
    </div>
    
  )
}

export default AuthForm;