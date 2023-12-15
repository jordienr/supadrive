import { useUser } from "@/lib/supabase";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { data: user, error: userError, loading: userLoading } = useUser();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <pre>{JSON.stringify(user)}</pre>
        {userLoading ? (
          <></>
        ) : (
          <>
            <Component {...pageProps} />
          </>
        )}
      </QueryClientProvider>
    </>
  );
}
