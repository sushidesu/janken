import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { CurrentUserIdProvider } from "../hooks/firebase/useCurrentUserId";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <CurrentUserIdProvider>
      <Component {...pageProps} />;
    </CurrentUserIdProvider>
  );
}

export default MyApp;
