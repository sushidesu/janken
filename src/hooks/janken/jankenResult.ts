import { JankenHand } from "./jankenHand";

export type Players = "player" | "opponent";

export type JankenResult =
  | {
      type: "game";
      winner: {
        user: Players;
        hand: JankenHand;
      };
      loser: {
        user: Players;
        hand: JankenHand;
      };
    }
  | {
      type: "draw";
      hand: JankenHand;
    };
