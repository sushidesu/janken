import Head from "next/head";
import clsx from "clsx";
import { useGame } from "../game/useGame";
import { useJankenpon } from "../janken/useJankenpon";
import { JankenButtonContainer } from "../components/JankenButtonContainer";
import { JankenButton } from "../components/JankenButton";
import { HandViewer } from "../components/HandViewer";

export type Hand = "rock" | "paper" | "scissors";

export type Player = "me" | "opponent";

function Index(): JSX.Element {
  const { you, opponent } = useGame();

  const { value, playerAHand, ponPlayerA, playerBHand, ponPlayerB } =
    useJankenpon(you, opponent);

  const result = () => {
    switch (value.status) {
      case "loading":
      case "waiting":
        return "待機中...";
      case "done":
        if (value.result.type === "draw") {
          return "あいこ";
        } else {
          return `${value.result.winner.user.name}の勝ち`;
        }
    }
  };

  return (
    <div
      className={clsx(
        "max-w-md",
        "mx-auto",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
      )}
    >
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <h1 className={clsx("mt-10", "font-bold", "text-xl")}>Janken</h1>

      <div className={clsx("mt-10", "flex", "space-x-10")}>
        <div>
          <p>{you.name}</p>
          <HandViewer hand={playerAHand} />
        </div>
        <div className={clsx()}>
          <p className={clsx("text-lg")}>{result()}</p>
        </div>
        <div>
          <p>{opponent.name}</p>
          <HandViewer hand={playerBHand} />
        </div>
      </div>

      <div className={clsx("mt-10")}>
        <JankenButtonContainer>
          <JankenButton onClick={ponPlayerA} hand={"rock"} />
          <JankenButton onClick={ponPlayerA} hand={"scissors"} />
          <JankenButton onClick={ponPlayerA} hand={"paper"} />
        </JankenButtonContainer>
      </div>
      <div className={clsx("mt-10")}>
        <JankenButtonContainer>
          <JankenButton onClick={ponPlayerB} hand={"rock"} />
          <JankenButton onClick={ponPlayerB} hand={"scissors"} />
          <JankenButton onClick={ponPlayerB} hand={"paper"} />
        </JankenButtonContainer>
      </div>
    </div>
  );
}

export default Index;
