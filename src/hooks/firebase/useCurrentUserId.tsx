import { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../../plugins/firebase";

const Context = createContext<string | undefined>(undefined);

export const useCurrentUserIdContext = (): string | undefined => {
  return useContext(Context);
};

const useCurrentUserId = (): string | undefined => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((maybeUser) => {
      setUserId(maybeUser?.uid);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return userId;
};

type Props = {
  children?: React.ReactNode;
};

export const CurrentUserIdProvider = ({ children }: Props): JSX.Element => {
  const userId = useCurrentUserId();
  return <Context.Provider value={userId}>{children}</Context.Provider>;
};
