import clsx from "clsx";
import { Room, RoomStatus } from "../../hooks/room/useRoom";
import { Hand } from "../../hooks/janken/jankenHand";
import { Layout } from "../Layout";
import { HeadWithMetadata } from "../HeadWithMetadata";
import { Button } from "../Button";
import { UserWrapper } from "../UserWrapper";
import { UserName } from "../UserName";
import { Ready } from "./Ready";
import { JankenButton } from "./JankenButton";
import { JankenButtonContainer } from "./JankenButtonContainer";
import { HandViewer } from "./HandViewer";
import { Result } from "./Result";
import { LinkButtonWithIcon } from "../LinkButtonWithIcon";
import { FaTwitter } from "react-icons/fa";

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
      <HeadWithMetadata />
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
            <HandViewer hand={opponentHand} unknown={status !== "result"} />
          ) : null}
        </UserWrapper>
      </div>
      <div className={clsx("mt-10")}>
        {status === "waitingPlayersHand" ? (
          <JankenButtonContainer>
            <JankenButton hand="rock" onClick={onHandClick} />
            <JankenButton hand="scissors" onClick={onHandClick} />
            <JankenButton hand="paper" onClick={onHandClick} />
          </JankenButtonContainer>
        ) : null}
        {status === "waitingPlayersReady" ? (
          <Button onClick={onReadyClick}>準備OK</Button>
        ) : null}
        {status === "waitingPlayersEnter" ? (
          <div className={clsx("flex", "flex-col", "items-center")}>
            <p className={clsx("text-gray-500", "text-center")}>
              対戦相手を招待してください
            </p>
            <div className={clsx("mt-10")}>
              <LinkButtonWithIcon
                href={`https://twitter.com/intent/tweet?hashtags=じゃんけん一発勝負オンライン&url=${invitationLink}&text=対戦相手募集中...`}
                targetBlank
                icon={FaTwitter}
              >
                招待リンクをツイート
              </LinkButtonWithIcon>
            </div>
            <div className={clsx("mt-5", "mx-10")}>
              <span className={clsx("text-sm", "ml-5", "text-gray-500")}>
                招待リンク
              </span>
              <blockquote
                className={clsx(
                  "mt-1",
                  "bg-gray-100",
                  "px-5",
                  "py-4",
                  "rounded"
                )}
              >
                {invitationLink}
              </blockquote>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
