import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import { CurrentUserIdProvider } from "../hooks/firebase/useCurrentUserId";
import { FirebaseClient } from "../infra/firebaseClient";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const firebaseClient = new FirebaseClient();
  useEffect(() => {
    firebaseClient.anonymousLogin();
  }, []);

  return (
    <CurrentUserIdProvider>
      <Component {...pageProps} />
    </CurrentUserIdProvider>
  );
}

export default MyApp;
