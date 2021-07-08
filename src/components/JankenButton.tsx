import clsx from "clsx";
import { Hand } from "../janken/jankenHand";

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
    <button
      onClick={() => {
        onClick(hand);
      }}
      className={clsx("px-4", "py-1.5", "bg-blue-300", "rounded-sm")}
    >
      {label()}
    </button>
  );
}
