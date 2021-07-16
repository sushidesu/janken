import clsx from "clsx";

export type Props = {
  text: string;
  children?: React.ReactNode;
};

export function UserWrapper({ text, children }: Props): JSX.Element {
  return (
    <div className={clsx("w-full")}>
      <p className={clsx("text-gray-500", "text-sm", "text-center")}>{text}</p>
      <div
        className={clsx(
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "space-y-2"
        )}
      >
        {children}
      </div>
    </div>
  );
}
