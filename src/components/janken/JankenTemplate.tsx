import Head from "next/head";
import clsx from "clsx";
import { Room, RoomStatus } from "../../hooks/room/useRoom";
import { Layout } from "../Layout";
import { UserName } from "../UserName";
import { Ready } from "../Ready";
import { JankenButton } from "../JankenButton";
import { JankenButtonContainer } from "../JankenButtonContainer";
import { Hand } from "../../hooks/janken/jankenHand";

export type Props = Room & {
  status: RoomStatus;
  invitationLink: string;
  onReadyClick: () => void;
  onHandClick: (hand: Hand) => void;
};

export function JankenTemplate({
  status,
  player,
  opponent,
  invitationLink,
  onReadyClick,
  onHandClick,
}: Props): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <p>{status}</p>
      <div className={clsx("mt-10", "flex", "space-x-10")}>
        <div>
          <p>自分</p>
          <UserName name={player?.name} />
          <Ready ready={player?.ready} />
        </div>
        <div>
          <p>相手</p>
          <UserName name={opponent?.name} />
          <Ready ready={opponent?.ready} />
        </div>
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
          <button className={clsx("border-2")} onClick={onReadyClick}>
            準備OK
          </button>
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
