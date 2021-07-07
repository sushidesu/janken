export type Hand = "rock" | "paper" | "scissors";

export class JankenHand {
  constructor(public readonly hand: Hand) {}

  canIWin(hand: JankenHand): boolean {
    switch (hand.hand) {
      case "rock":
        return this.hand === "paper";
      case "paper":
        return this.hand === "scissors";
      case "scissors":
        return this.hand === "rock";
      default:
        return false;
    }
  }

  sameValueAs(hand: JankenHand): boolean {
    return hand.hand === this.hand;
  }
}
