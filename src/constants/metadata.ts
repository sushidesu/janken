export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_PRODUCTION === "true"
    ? "https://janken.dayo.app"
    : "http://localhost:3000";

export const SITE_TITLE = "じゃんけん一発勝負オンライン";

export const APPLE_TOUCH_ICON = `${SITE_ORIGIN}/apple-touch-icon.png`;
export const FAVICON = `${SITE_ORIGIN}/favicon.png`;
export const SITE_MAIN_OGP = `${SITE_ORIGIN}/img/ogp.png`;
export const SITE_UNDER_RECRUITMENT_OGP = `${SITE_ORIGIN}/img/under-recruitment.png`;
