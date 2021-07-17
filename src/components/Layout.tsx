import Link from "next/link";
import clsx from "clsx";
import { TOP_PAGE } from "../constants/pagePath";
import { FaRegCopyright } from "react-icons/fa";

export type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "w-full",
        "min-h-screen",
        "bg-amber-100",
        "overflow-hidden",
        "px-2"
      )}
    >
      <div
        className={clsx(
          "max-w-sm",
          "my-5",
          "mx-auto",
          "pb-5",
          "pt-8",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
          "bg-white",
          "shadow-lg",
          "shadow-amber",
          "rounded"
        )}
      >
        <header>
          <Link href={TOP_PAGE} passHref>
            <a className={clsx("mt-10", "font-bold", "text-xl")}>
              じゃんけんオンライン
            </a>
          </Link>
        </header>
        {children}
        <footer
          className={clsx(
            "mt-16",
            "flex",
            "items-center",
            "text-xs",
            "text-gray-300"
          )}
        >
          <FaRegCopyright />
          <span className={clsx("ml-1")}>sushidesu</span>
        </footer>
      </div>
    </div>
  );
}
