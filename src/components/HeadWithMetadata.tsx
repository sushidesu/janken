import Head from "next/head";
import { SITE_TITLE } from "../constants/metadata";

export function HeadWithMetadata(): JSX.Element {
  return (
    <Head>
      <title>{SITE_TITLE}</title>
    </Head>
  );
}
