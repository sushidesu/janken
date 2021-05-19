import { useState } from "react";
import clsx from "clsx";
import { JankenButton } from "../components/JankenButton";
import { HandViewer } from "../components/HandViewer";
import { WinnerList } from "../components/WinnerList";

export type Hand = "rock" | "paper" | "scissors";

export type Player = "me" | "opponent";

function Index(): JSX.Element {
  const [meHand, setMeHand] = useState<Hand>("rock");
  const [opponentHand, setOpponentHand] = useState<Hand>("rock");

  const randomHand = (): Hand => {
    const HANDS: Hand[] = ["rock", "paper", "scissors"];
    return HANDS[Math.floor(Math.random() * 3)];
  };

  const [winners, setWinners] = useState<Player[]>([]);
  const battleCount = winners.filter((winner) => winner !== null).length;
  const meWinRate =
    (winners.filter((winner) => winner === "me").length / battleCount) * 100;

  const calcWinner = (handA: Hand, handB: Hand): Player | null => {
    if (handA === handB) {
      return null;
    }
    switch (handA) {
      case "rock":
        if (handB === "scissors") {
          return "me";
        } else {
          return "opponent";
        }
      case "paper":
        if (handB === "rock") {
          return "me";
        } else {
          return "opponent";
        }
      case "scissors":
        if (handB === "paper") {
          return "me";
        } else {
          return "opponent";
        }
    }
  };

  const jankenpon = (newMeHand: Hand) => () => {
    const newOppoentHand = randomHand();
    setMeHand(newMeHand);
    setOpponentHand(newOppoentHand);
    const winner = calcWinner(newMeHand, newOppoentHand);
    console.log({ newMeHand, newOppoentHand, winner });
    setWinners((prev) => prev.concat(winner));
  };

  return (
    <div>
      <h1 className={clsx("font-bold", "text-xl")}>Janken</h1>
      <p>{`勝率: ${meWinRate}`}</p>
      <ol>
        {winners.map((winner, index) => (
          <WinnerList key={index} player={winner} />
        ))}
      </ol>
      <div>
        <div className={clsx("mt-10")}>
          <p>自分</p>
          <HandViewer hand={meHand} />
        </div>
        <div className={clsx("flex", "mt-10")}>
          <div className={clsx()}>
            <JankenButton onClick={jankenpon("rock")} hand={"rock"} />
          </div>
          <div className={clsx("ml-3")}>
            <JankenButton onClick={jankenpon("scissors")} hand={"scissors"} />
          </div>
          <div className={clsx("ml-3")}>
            <JankenButton onClick={jankenpon("paper")} hand={"paper"} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>相手</p>
          <HandViewer hand={opponentHand} />
        </div>
      </div>
    </div>
  );
}

export default Index;
