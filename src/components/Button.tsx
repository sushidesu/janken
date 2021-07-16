import clsx from "clsx";

export type Props = {
  loading?: boolean;
  disabled?: boolean;
  children?: string;
  onClick?: JSX.IntrinsicElements["button"]["onClick"];
};

export function Button({
  loading,
  disabled,
  children,
  onClick,
}: Props): JSX.Element {
  return (
    <button
      className={clsx(
        "bg-orange-300",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "py-2",
        "px-4",
        "rounded-sm",
        "font-bold"
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "loading..." : children}
    </button>
  );
}
