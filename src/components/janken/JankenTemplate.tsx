import Head from "next/head";
import clsx from "clsx";
import { Room, RoomStatus } from "../../hooks/room/useRoom";
import { Hand } from "../../hooks/janken/jankenHand";
import { Layout } from "../Layout";
import { Button } from "../Button";
import { UserWrapper } from "../UserWrapper";
import { UserName } from "../UserName";
import { Ready } from "./Ready";
import { JankenButton } from "./JankenButton";
import { JankenButtonContainer } from "./JankenButtonContainer";
import { HandViewer } from "./HandViewer";
import { Result } from "./Result";

export type Props = Room & {
  status: RoomStatus;
  result: "game" | "draw" | undefined;
  winner: string | undefined;
  playerHand: Hand | undefined;
  opponentHand: Hand | undefined;
  invitationLink: string;
  onReadyClick: () => void;
  onHandClick: (hand: Hand) => void;
};

export function JankenTemplate({
  status,
  result,
  winner,
  player,
  playerHand,
  opponent,
  opponentHand,
  invitationLink,
  onReadyClick,
  onHandClick,
}: Props): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <div className={clsx("mt-10")}>
        <Result status={result} winner={winner} />
      </div>
      <div
        className={clsx("mt-4", "p-5", "flex", "justify-between", "min-w-full")}
      >
        <UserWrapper text="自分">
          <UserName name={player?.name} />
          {status === "waitingPlayersReady" ? (
            <Ready ready={player?.ready} />
          ) : null}
          {status === "waitingPlayersHand" || status === "result" ? (
            <HandViewer hand={playerHand} />
          ) : null}
        </UserWrapper>
        <UserWrapper text="相手">
          <UserName name={opponent?.name} />
          {status === "waitingPlayersReady" ? (
            <Ready ready={opponent?.ready} />
          ) : null}
          {status === "waitingPlayersHand" || status === "result" ? (
            <HandViewer hand={opponentHand} unkown={status !== "result"} />
          ) : null}
        </UserWrapper>
      </div>
      {status === "waitingPlayersHand" ? (
        <div className={clsx("mt-10")}>
          <JankenButtonContainer>
            <JankenButton hand="rock" onClick={onHandClick} />
            <JankenButton hand="scissors" onClick={onHandClick} />
            <JankenButton hand="paper" onClick={onHandClick} />
          </JankenButtonContainer>
        </div>
      ) : null}
      {status === "waitingPlayersReady" ? (
        <div className={clsx("mt-10")}>
          <Button onClick={onReadyClick}>準備OK</Button>
        </div>
      ) : null}
      {status === "waitingPlayersEnter" ? (
        <div className={clsx("mt-10")}>
          <p>招待リンク</p>
          <input className={clsx("border-2")} readOnly value={invitationLink} />
        </div>
      ) : null}
    </Layout>
  );
}
