import Head from "next/head";
import {
  SITE_ORIGIN,
  SITE_TITLE,
  FAVICON,
  APPLE_TOUCH_ICON,
  SITE_MAIN_OGP,
} from "../constants/metadata";

export type Props = {
  title?: string;
  description?: string;
  url?: string;
  ogp?: string;
  cardType?: "summary" | "summary_large_image";
};

export function HeadWithMetadata({
  title,
  description,
  url,
  ogp,
  cardType = "summary",
}: Props): JSX.Element {
  const TITLE = title || SITE_TITLE;
  const URL = url || SITE_ORIGIN;
  const OGP = ogp || SITE_MAIN_OGP;
  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="icon" type="image/png" href={FAVICON} />
      <link rel="apple-touch-icon" sizes="180x180" href={APPLE_TOUCH_ICON} />
      {description ? <meta name="description" content={description} /> : null}
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:title" content={TITLE} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={OGP} />
      <meta property="twitter:image" content={OGP} />
      <meta property="twitter:card" content={cardType} />
    </Head>
  );
}
