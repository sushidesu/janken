import Head from "next/head";
import { SITE_TITLE, FAVICON, APPLE_TOUCH_ICON } from "../constants/metadata";

export function HeadWithMetadata(): JSX.Element {
  return (
    <Head>
      <title>{SITE_TITLE}</title>
      <link rel="icon" type="image/png" href={FAVICON} />
      <link rel="apple-touch-icon" sizes="180x180" href={APPLE_TOUCH_ICON} />
    </Head>
  );
}
