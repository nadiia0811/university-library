"use client";

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/validations';

const SignUpPage = () => {
  const defaultValues = {
    email: "",
    password: "",
    universityCard: "",
    fullName: "",
    universityId: 0
  };

  return (
    <AuthForm  type="SIGN_UP"
               schema={signUpSchema} 
               defaultValues={defaultValues}
               onSubmit={() => {}}/>
  )
}

export default SignUpPage;