import clsx from "clsx";

export type Props = {
  label?: string;
  onChange?: JSX.IntrinsicElements["input"]["onChange"];
  onBlur?: JSX.IntrinsicElements["input"]["onBlur"];
  value?: JSX.IntrinsicElements["input"]["value"];
  placeholder?: JSX.IntrinsicElements["input"]["placeholder"];
};

export function Input({ label, ...rest }: Props): JSX.Element {
  return (
    <div className={clsx("space-y-1")}>
      {label ? (
        <label className={clsx("block", "text-sm", "text-gray-800")}>
          {label}
        </label>
      ) : null}
      <input
        className={clsx(
          "shadow",
          "border",
          "rounded",
          "focus:outline-none",
          "py-2",
          "px-3",
          "text-gray-700",
          "leading-tight",
          "focus:outline-none",
          "focus:ring",
          "focus:border-blue-300"
        )}
        {...rest}
      />
    </div>
  );
}
