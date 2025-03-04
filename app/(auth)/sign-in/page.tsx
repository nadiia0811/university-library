"use client";

import AuthForm from '@/components/AuthForm';
import { signInSchema } from '@/lib/validations';
import React from 'react';
import { signInWithCredentials } from '@/lib/actions/auth';

const SignInPage = () => {
  const defaultValues = {
    email: "",
    password: ""
  };

  return (
    <AuthForm  type="SIGN_IN"
               schema={signInSchema} 
               defaultValues={defaultValues}
               onSubmit={signInWithCredentials}/>
  )
}

export default SignInPage;