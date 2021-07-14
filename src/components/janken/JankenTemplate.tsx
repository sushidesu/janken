import Head from "next/head";
import clsx from "clsx";
import { Room } from "../../hooks/room/useRoom";
import { Layout } from "../Layout";
import { UserName } from "../UserName";
import { Ready } from "../Ready";

export type Props = Room & {
  invitationLink: string;
  onReadyClick: () => void;
};

export function JankenTemplate({
  status,
  player,
  opponent,
  invitationLink,
  onReadyClick,
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
          <Ready ready={player?.ready} />
        </div>
      </div>
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
