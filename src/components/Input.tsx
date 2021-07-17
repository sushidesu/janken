import clsx from "clsx";

export type Props = {
  label?: string;
  onChange?: JSX.IntrinsicElements["input"]["onChange"];
  onBlur?: JSX.IntrinsicElements["input"]["onBlur"];
  value?: JSX.IntrinsicElements["input"]["value"];
  placeholder?: JSX.IntrinsicElements["input"]["placeholder"];
  error?: boolean;
  message?: string;
};

export function Input({ label, error, message, ...rest }: Props): JSX.Element {
  return (
    <div className={clsx("space-y-1")}>
      {label ? (
        <label className={clsx("block", "text-sm", "text-gray-800", "mb-1")}>
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
          error ? "focus:border-red-300" : "focus:border-blue-300",
          error && "focus:ring-red-300",
          error && "border-red-400"
        )}
        {...rest}
      />
      <p className={clsx("text-sm", error ? "text-red-400" : "text-gray-400")}>
        {message}
      </p>
    </div>
  );
}
