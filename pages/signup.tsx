import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import React from "react";

type Props = {};

const signup = (props: Props) => {
  return (
    <div>
      signup
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email");
          const password = formData.get("password");

          if (!email || !password) {
            return;
          }

          const { data, error } = await supabase.auth.signUp({
            email: email.toString(),
            password: password.toString(),
          });

          if (error) {
            console.error(error);
            window.alert(error.message);
            return;
          }

          console.log(data);
        }}
        className="max-w-xs mx-auto mt-12"
      >
        <Label>
          Email
          <Input name="email" type="email" />
        </Label>
        <Label>
          Password
          <Input name="password" type="password" />
        </Label>
        <Button className="mt-4 w-full">
          <span>Sign up</span>
        </Button>
        <div className="mt-4">
          <Link href="/signin">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default signup;
