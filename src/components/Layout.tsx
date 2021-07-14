import Link from "next/link";
import clsx from "clsx";
import { TOP_PAGE } from "../constants/pagePath";

export type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "max-w-md",
        "my-5",
        "mx-auto",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
      )}
    >
      <header>
        <Link href={TOP_PAGE} passHref>
          <a className={clsx("mt-10", "font-bold", "text-xl")}>Janken</a>
        </Link>
      </header>
      {children}
    </div>
  );
}
