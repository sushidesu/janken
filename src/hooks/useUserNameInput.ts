import { ChangeEvent, useCallback, useMemo, useState } from "react";

export type UseUserNameInputResponse = {
  name: string;
  disabled: boolean;
  error: boolean;
  message: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useUserNameInput = (): UseUserNameInputResponse => {
  const [name, setName] = useState<string>("");
  const [entered, setEntered] = useState<boolean>(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setEntered(true);
    setName(e.target.value);
  }, []);

  const disabled = useMemo(() => {
    return name.length > 10 || name === "";
  }, [name]);

  const error = useMemo(() => {
    return entered && disabled;
  }, [disabled, entered]);

  const message = useMemo(() => {
    return `${name.length}/10`;
  }, [name]);

  return {
    name,
    disabled,
    error,
    message,
    handleChange,
  };
};
