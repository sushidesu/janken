import { useState } from "react";
import clsx from "clsx";
import { JankenButton } from "../components/JankenButton";
import { HandViewer } from "../components/HandViewer";

export type Hand = "rock" | "paper" | "scissors";

function Index(): JSX.Element {
  const [hand, setHand] = useState<Hand>("rock");
  const randomHand = (): Hand => {
    const HANDS: Hand[] = ["rock", "paper", "scissors"];
    return HANDS[Math.floor(Math.random() * 3)];
  };
  const opponentHand = randomHand();
  return (
    <div>
      <h1 className={clsx("font-bold", "text-xl")}>Janken</h1>
      <div>
        <div className={clsx("mt-10")}>
          <HandViewer hand={hand} />
        </div>
        <div className={clsx("flex", "mt-10")}>
          <div className={clsx()}>
            <JankenButton onClick={() => setHand("rock")} hand={"rock"} />
          </div>
          <div className={clsx("ml-3")}>
            <JankenButton
              onClick={() => setHand("scissors")}
              hand={"scissors"}
            />
          </div>
          <div className={clsx("ml-3")}>
            <JankenButton onClick={() => setHand("paper")} hand={"paper"} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <HandViewer hand={opponentHand} />
        </div>
      </div>
    </div>
  );
}

export default Index;
