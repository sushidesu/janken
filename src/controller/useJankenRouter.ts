import { useRouter } from "next/router";
import { useCallback } from "react";
import { TOP_PAGE, ROOM_PAGE, JOIN_PAGE } from "../constants/pagePath";

export type PagePath =
  | {
      page: "top";
    }
  | {
      page: "room";
      roomId: string;
    }
  | {
      page: "join";
      roomId: string;
    };

export type JankenRouterResponse = {
  push: (page: PagePath) => void;
};

export const useJankenRouter = (): JankenRouterResponse => {
  const router = useRouter();

  const push = useCallback(
    (page: PagePath) => {
      switch (page.page) {
        case "top":
          router.push(TOP_PAGE);
          break;
        case "room":
          router.push(ROOM_PAGE(page.roomId));
          break;
        case "join":
          router.push(JOIN_PAGE(page.roomId));
          break;
        default:
          break;
      }
    },
    [router]
  );

  return {
    push,
  };
};
