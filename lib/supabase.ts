import { UserResponse, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing env.NEXT_PUBLIC_SUPABASE_URL or env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
});

export const useUser = () => {
  const [user, setUser] = useState<UserResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () => {
      setLoading(true);
      const currentUser = await supabase.auth.getUser();
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { data: user?.data, error: user?.error, loading };
};
