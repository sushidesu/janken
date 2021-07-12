import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import clsx from "clsx";
import { useRoom } from "../../hooks/room/useRoom";
import { UserName } from "../../components/UserName";
import { useCurrentUserIdContext } from "../../hooks/firebase/useCurrentUserId";
import { useRoomValue } from "../../hooks/firebase/useRoomValue";
import { SITE_ORIGIN } from "../../constants/metadata";

type Props = {
  roomId: string | undefined;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { rid } = context.query;
  if (typeof rid === "string") {
    return {
      props: {
        roomId: rid,
      },
    };
  } else {
    return {
      props: {
        roomId: undefined,
      },
    };
  }
};

function RoomPage({
  roomId,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const rid = roomId ?? "";
  const invitationLink = `${SITE_ORIGIN}/join/${rid}`;

  const currentUserId = useCurrentUserIdContext();
  const roomValue = useRoomValue(rid);
  const { room, dispatch } = useRoom();

  useEffect(() => {
    console.log(roomValue);
    if (roomValue && currentUserId) {
      const { hostUserId, hostUserName, guestUserId, guestUserName } =
        roomValue;
      // ホスト
      if (hostUserId && hostUserName) {
        dispatch({
          type: hostUserId === currentUserId ? "enterPlayer" : "enterOpponent",
          payload: {
            id: hostUserId,
            name: hostUserName,
          },
        });
      }
      // ゲスト
      if (guestUserId && guestUserName) {
        dispatch({
          type: guestUserId === currentUserId ? "enterPlayer" : "enterOpponent",
          payload: {
            id: guestUserId,
            name: guestUserName,
          },
        });
      }
    }
  }, [roomValue, currentUserId]);

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
          <p>自分</p>
          <UserName name={room.player?.name} />
        </div>
        <div>
          <p>相手</p>
          <UserName name={room.opponent?.name} />
        </div>
      </div>

      <div className={clsx("mt-10")}>
        <p>招待リンク</p>
        <input className={clsx("border-2")} readOnly value={invitationLink} />
      </div>
    </div>
  );
}

export default RoomPage;
