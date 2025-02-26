"use client";

import AuthForm from '@/components/AuthForm';
import { signInSchema } from '@/lib/validations';
import React from 'react';

const SignInPage = () => {
  const defaultValues = {
    email: "",
    password: ""
  };

  return (
    <AuthForm  type="SIGN_IN"
               schema={signInSchema} 
               defaultValues={defaultValues}
               onSubmit={() => {}}/>
  )
}

export default SignInPage;