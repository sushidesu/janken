import clsx from "clsx";
import { IconType } from "react-icons";
import {
  TARGET_BLANK_PROPS,
  REL_NOREFERRER_PROPS,
} from "../constants/targetBlankProps";

export type Props = {
  children?: string;
  href?: string;
  targetBlank?: boolean;
  icon: IconType;
};

export function LinkButtonWithIcon({
  children,
  href,
  targetBlank = false,
  icon: Icon,
}: Props): JSX.Element {
  const relProps = targetBlank ? TARGET_BLANK_PROPS : REL_NOREFERRER_PROPS;
  return (
    <a
      href={href}
      {...relProps}
      className={clsx(
        "text-white",
        "flex",
        "justify-center",
        "items-center",
        "bg-blue-400",
        "w-max",
        "py-3",
        "px-4",
        "rounded-sm",
        "font-bold",
        "shadow-md"
      )}
    >
      <Icon />
      <span className={clsx("ml-2")}>{children}</span>
    </a>
  );
}
