import clsx from "clsx";
import Loader from "react-spinners/SyncLoader";

export type Props = {
  name?: string;
};

export function UserName({ name }: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "h-16",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "text-center"
      )}
    >
      {name ? (
        <p>{name}</p>
      ) : (
        <Loader size={9} speedMultiplier={0.6} color={"rgb(255, 205, 129)"} />
      )}
    </div>
  );
}
