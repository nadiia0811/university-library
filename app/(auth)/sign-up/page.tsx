"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const SignUpPage = () => {
  const defaultValues = {
    email: "",
    password: "",
    universityCard: "",
    fullName: "",
    universityId: 0,
  };

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={defaultValues}
      onSubmit={signUp}
    />
  );
};

export default SignUpPage;
