import clsx from "clsx";

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
      {name ? <p>{name}</p> : <p>loading...</p>}
    </div>
  );
}
