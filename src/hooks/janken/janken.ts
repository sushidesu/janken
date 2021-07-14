import { JankenHand } from "./jankenHand";
import { JankenResult } from "./jankenResult";

export class Janken {
  public pon(playerHand: JankenHand, opponentHand: JankenHand): JankenResult {
    // あいこ
    if (playerHand.sameValueAs(opponentHand)) {
      return {
        type: "draw",
        hand: playerHand,
      };
    } else {
      // playerの勝ち
      if (playerHand.canIWin(opponentHand)) {
        return {
          type: "game",
          winner: {
            user: "player",
            hand: playerHand,
          },
          loser: {
            user: "opponent",
            hand: opponentHand,
          },
        };
        // opponentの勝ち
      } else {
        return {
          type: "game",
          winner: {
            user: "opponent",
            hand: opponentHand,
          },
          loser: {
            user: "player",
            hand: playerHand,
          },
        };
      }
    }
  }
}
