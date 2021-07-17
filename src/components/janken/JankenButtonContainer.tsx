import clsx from "clsx";

export type Props = {
  children?: React.ReactNode;
};

export function JankenButtonContainer({ children }: Props): JSX.Element {
  return <div className={clsx("flex", "space-x-3")}>{children}</div>;
}
