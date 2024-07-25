import { SignIn } from "@clerk/nextjs";
import React from "react";
 
const SignInPage = () => (
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
);
export default SignInPage;