import React from "react";
import clsx from "clsx";

export type Hand = "rock" | "paper" | "scissors";

export type Props = {
  hand: Hand | undefined;
  unkown?: boolean;
};

const HAND_EMOJI: {
  [key in Hand]: string;
} = {
  rock: "✊",
  paper: "🖐",
  scissors: "✌",
};

export function HandViewer({ hand, unkown }: Props): JSX.Element {
  if (hand && !unkown) {
    return <p className={clsx("font-bold", "text-3xl")}>{HAND_EMOJI[hand]}</p>;
  } else {
    return <p className={clsx("font-bold", "text-3xl")}>{"?"}</p>;
  }
}
