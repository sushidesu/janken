import { JankenHand } from "./jankenHand";
import { JankenResult } from "./jankenResult";
import { User } from "./user";

export class Janken {
  constructor(private readonly playerA: User, private readonly playerB: User) {}

  public pon(playerAHand: JankenHand, playerBHand: JankenHand): JankenResult {
    // あいこ
    if (playerAHand.sameValueAs(playerBHand)) {
      return {
        type: "draw",
        hand: playerAHand,
      };
    } else {
      // Aの勝ち
      if (playerAHand.canIWin(playerBHand)) {
        return {
          type: "game",
          winner: {
            user: this.playerA,
            hand: playerAHand,
          },
          loser: {
            user: this.playerB,
            hand: playerBHand,
          },
        };
        // Bの勝ち
      } else {
        return {
          type: "game",
          winner: {
            user: this.playerB,
            hand: playerBHand,
          },
          loser: {
            user: this.playerA,
            hand: playerAHand,
          },
        };
      }
    }
  }
}
