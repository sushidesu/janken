import Loader from "react-spinners/SyncLoader";

export type Props = {
  size?: number;
  margin?: number;
};

export function Loading({ size, margin }: Props): JSX.Element {
  return (
    <Loader
      size={size}
      margin={margin}
      speedMultiplier={0.6}
      color={"rgb(255, 205, 129)"}
    />
  );
}
