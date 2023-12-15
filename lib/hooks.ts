import { useRouter } from "next/router";
import { useUser } from "./supabase";

export const usePageConfig = ({ requiresAuth = true }) => {
  const { data: user } = useUser();
  const router = useRouter();

  if (requiresAuth && !user?.user?.id) {
    router.push("/signin");
  }
};
