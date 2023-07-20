import { SignIn } from "@clerk/nextjs/app-beta";
import { cookies } from 'next/headers'
 
export default function Page() {
  return <SignIn signUpUrl="/sign-up" />
}