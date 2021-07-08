import Head from "next/head";
import clsx from "clsx";
import { JankenButton } from "../components/JankenButton";
import { HandViewer } from "../components/HandViewer";
import { useJankenpon } from "../janken/useJankenpon";
import { User } from "../janken/user";

export type Hand = "rock" | "paper" | "scissors";

export type Player = "me" | "opponent";

function Index(): JSX.Element {
  const A = new User("a", "自分");
  const B = new User("b", "相手");

  const {
    value,
    playerAHand,
    ponPlayerA,
    playerBHand,
    ponPlayerB,
  } = useJankenpon(A, B);

  const result =
    value.status === "waiting"
      ? "待機中..."
      : value.result.type === "draw"
      ? "あいこ"
      : `${value.result.winner.user.name}の勝ち`;

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

      <div className={clsx("mt-10")}>
        <p className={clsx("text-lg")}>{result}</p>
      </div>

      <div className={clsx("mt-10")}>
        <div
          className={clsx(
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "space-y-5"
          )}
        >
          <p>{A.name}</p>
          <HandViewer hand={playerAHand} />
          <div className={clsx("flex", "space-x-3")}>
            <JankenButton onClick={ponPlayerA} hand={"rock"} />
            <JankenButton onClick={ponPlayerA} hand={"scissors"} />
            <JankenButton onClick={ponPlayerA} hand={"paper"} />
          </div>
        </div>

        <hr className={clsx("w-full", "my-10")} />

        <div
          className={clsx(
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "space-y-5"
          )}
        >
          <p>{B.name}</p>
          <HandViewer hand={playerBHand} />
          <div className={clsx("flex", "space-x-3")}>
            <JankenButton onClick={ponPlayerB} hand={"rock"} />
            <JankenButton onClick={ponPlayerB} hand={"scissors"} />
            <JankenButton onClick={ponPlayerB} hand={"paper"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
