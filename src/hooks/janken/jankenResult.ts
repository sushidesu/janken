import { JankenHand } from "./jankenHand";
import { User } from "./user";

export type JankenResult =
  | {
      type: "game";
      winner: {
        user: User;
        hand: JankenHand;
      };
      loser: {
        user: User;
        hand: JankenHand;
      };
    }
  | {
      type: "draw";
      hand: JankenHand;
    };
