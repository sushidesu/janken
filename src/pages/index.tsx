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
    <div>
      <h1 className={clsx("font-bold", "text-xl")}>Janken</h1>

      <div className={clsx("mt-10")}>
        <p>{result}</p>
      </div>

      <div className={clsx("mt-10")}>
        <div>
          <p>自分</p>
          <HandViewer hand={playerAHand} />
          <div className={clsx("flex")}>
            <div className={clsx()}>
              <JankenButton onClick={() => ponPlayerA("rock")} hand={"rock"} />
            </div>
            <div className={clsx("ml-3")}>
              <JankenButton
                onClick={() => ponPlayerA("scissors")}
                hand={"scissors"}
              />
            </div>
            <div className={clsx("ml-3")}>
              <JankenButton
                onClick={() => ponPlayerA("paper")}
                hand={"paper"}
              />
            </div>
          </div>
        </div>

        <hr className={clsx("my-10")} />
        <div>
          <p>相手</p>
          <HandViewer hand={playerBHand} />
          <div className={clsx("flex")}>
            <div className={clsx()}>
              <JankenButton onClick={() => ponPlayerB("rock")} hand={"rock"} />
            </div>
            <div className={clsx("ml-3")}>
              <JankenButton
                onClick={() => ponPlayerB("scissors")}
                hand={"scissors"}
              />
            </div>
            <div className={clsx("ml-3")}>
              <JankenButton
                onClick={() => ponPlayerB("paper")}
                hand={"paper"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
