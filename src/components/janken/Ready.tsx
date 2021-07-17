import clsx from "clsx";
import { FcOk } from "react-icons/fc";

export type Props = {
  ready: boolean | undefined;
};

export function Ready({ ready }: Props): JSX.Element | null {
  if (ready === undefined) {
    return null;
  }
  if (ready) {
    return (
      <div className={clsx("flex", "items-center", "h-6")}>
        <span className={clsx("mr-1", "text-sm")}>OK</span>
        <FcOk />
      </div>
    );
  } else {
    return (
      <div className={clsx("h-6")}>
        <span className={clsx("text-sm")}>準備中...</span>
      </div>
    );
  }
}
