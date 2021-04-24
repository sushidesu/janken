import { useState } from "react";
import clsx from "clsx";
import { JankenButton } from "../components/JankenButton";

type Hand = "rock" | "paper" | "scissors";

const HAND_EMOJI: {
  [key in Hand]: string;
} = {
  rock: "✊",
  paper: "🖐",
  scissors: "✌",
};

function Index(): JSX.Element {
  const [hand, setHand] = useState<Hand>("rock");
  return (
    <div>
      <h1 className={clsx("font-bold", "text-xl")}>Janken</h1>
      <div className={clsx("mt-10")}>
        <p className={clsx("font-bold", "text-3xl")}>{HAND_EMOJI[hand]}</p>
      </div>
      <div className={clsx("flex", "mt-10")}>
        <div className={clsx()}>
          <JankenButton onClick={() => setHand("rock")} hand={"rock"} />
        </div>
        <div className={clsx("ml-3")}>
          <JankenButton onClick={() => setHand("scissors")} hand={"scissors"} />
        </div>
        <div className={clsx("ml-3")}>
          <JankenButton onClick={() => setHand("paper")} hand={"paper"} />
        </div>
      </div>
    </div>
  );
}

export default Index;
