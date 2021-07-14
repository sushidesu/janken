import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useCallback, useEffect } from "react";
import { FirebaseClient } from "../../infra/firebaseClient";
import { useRoom } from "../../hooks/room/useRoom";
import { useCurrentUserIdContext } from "../../hooks/firebase/useCurrentUserId";
import { useRoomValue } from "../../hooks/firebase/useRoomValue";
import { SITE_ORIGIN } from "../../constants/metadata";
import { JankenTemplate } from "../../components/janken/JankenTemplate";
import { Hand } from "../../hooks/janken/jankenHand";

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

  const firebaseClient = new FirebaseClient();

  const currentUserId = useCurrentUserIdContext();
  const roomValue = useRoomValue(rid);
  const { room, dispatch, status } = useRoom({
    hostId: roomValue?.hostUserId,
    guestId: roomValue?.guestUserId,
    hostReady: roomValue?.hostReady,
    guestReady: roomValue?.guestReady,
    hostHand: undefined,
    guestHand: undefined,
  });

  const ready = useCallback(() => {
    if (currentUserId) {
      firebaseClient.ready({
        roomId: rid,
        userId: currentUserId,
      });
    }
  }, [firebaseClient]);

  const jankenpon = useCallback(
    (hand: Hand) => {
      if (currentUserId) {
        firebaseClient.jankenpon({
          roomId: rid,
          userId: currentUserId,
          hand,
        });
      }
    },
    [firebaseClient]
  );

  useEffect(() => {
    console.log(roomValue);
    if (roomValue && currentUserId) {
      const { hostUserId, hostUserName, guestUserId, guestUserName } =
        roomValue;
      // ホスト参加
      if (hostUserId && hostUserName) {
        dispatch({
          type: hostUserId === currentUserId ? "enterPlayer" : "enterOpponent",
          payload: {
            id: hostUserId,
            name: hostUserName,
          },
        });
      }
      // ゲスト参加
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

  useEffect(() => {
    if (roomValue && currentUserId) {
      if (roomValue.hostReady && roomValue.hostUserId) {
        dispatch({
          type:
            roomValue.hostUserId === currentUserId
              ? "readyPlayer"
              : "readyOpponent",
        });
      }
      if (roomValue.guestReady && roomValue.guestUserId) {
        dispatch({
          type:
            roomValue.guestUserId === currentUserId
              ? "readyPlayer"
              : "readyOpponent",
        });
      }
    }
  }, [roomValue, currentUserId]);

  return (
    <JankenTemplate
      status={status}
      player={room.player}
      opponent={room.opponent}
      invitationLink={invitationLink}
      onReadyClick={ready}
      onHandClick={jankenpon}
    />
  );
}

export default RoomPage;
