import { Hand } from "../../hooks/janken/jankenHand";
import { Button } from "../Button";

export type Props = {
  hand: Hand;
  onClick: (hand: Hand) => void;
};

export function JankenButton({ hand, onClick }: Props): JSX.Element {
  const label = () => {
    switch (hand) {
      case "rock":
        return "グー";
      case "paper":
        return "パー";
      case "scissors":
        return "チョキ";
    }
  };
  return (
    <Button
      onClick={() => {
        onClick(hand);
      }}
    >
      {label()}
    </Button>
  );
}
