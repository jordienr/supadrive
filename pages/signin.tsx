import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";

type Props = {};

const signin = (props: Props) => {
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const email = formData.get("email");
          const password = formData.get("password");

          if (!email || !password) {
            return;
          }

          const { data, error } = await supabase.auth.signInWithPassword({
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
          <span>Sign in</span>
        </Button>
        <div className="mt-4">
          <Link href="/signup">Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default signin;
