import React from "react";
import clsx from "clsx";
import { Hand } from "../pages/index";

export type Props = {
  hand: Hand | undefined;
};

const HAND_EMOJI: {
  [key in Hand]: string;
} = {
  rock: "✊",
  paper: "🖐",
  scissors: "✌",
};

export function HandViewer({ hand }: Props): JSX.Element {
  if (hand) {
    return <p className={clsx("font-bold", "text-3xl")}>{HAND_EMOJI[hand]}</p>;
  } else {
    return <p className={clsx("font-bold", "text-3xl")}>{"?"}</p>;
  }
}
