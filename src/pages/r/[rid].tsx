import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useCallback, useEffect } from "react";
import { FirebaseClient } from "../../infra/firebaseClient";
import { useJankenRouter } from "../../controller/useJankenRouter";
import { useRoom } from "../../hooks/room/useRoom";
import { useCurrentUserIdContext } from "../../hooks/firebase/useCurrentUserId";
import { useRoomValue } from "../../hooks/firebase/useRoomValue";
import { useJankenpon } from "../../hooks/janken/useJankenpon";
import { SITE_ORIGIN } from "../../constants/metadata";
import { Hand } from "../../hooks/janken/jankenHand";
import { useCheckCanJoinRoom } from "../../hooks/useCheckCanJoinRoom";
import { JankenTemplate } from "../../components/janken/JankenTemplate";
import { JankenRoomLoading } from "../../components/janken/JankenRoomLoading";

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
  const router = useJankenRouter();
  if (!roomId) {
    router.push({ page: "top" });
  }
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
    hostHand: roomValue?.hostHand,
    guestHand: roomValue?.guestHand,
  });
  const { playerHand, opponentHand, result } = useJankenpon({
    currentUserId,
    hostId: roomValue?.hostUserId,
    guestId: roomValue?.guestUserId,
    hostHand: roomValue?.hostHand,
    guestHand: roomValue?.guestHand,
  });

  const idChecked = useCheckCanJoinRoom({
    roomId: rid,
    currentUserId,
    onFailure: () => {
      router.push({ page: "top" });
    },
  });

  const gameResult = (): "game" | "draw" | undefined => {
    if (result.status === "waiting") {
      return undefined;
    } else {
      return result.value.type;
    }
  };
  const winner = (): string | undefined => {
    if (result.status === "waiting") {
      return undefined;
    } else {
      if (result.value.type === "draw") {
        return undefined;
      } else {
        return result.value.winner.user === "player"
          ? room.player?.name
          : room.opponent?.name;
      }
    }
  };

  const resultLink = `${SITE_ORIGIN}/result/${rid}`;

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

  if (idChecked) {
    return (
      <JankenTemplate
        status={status}
        result={gameResult()}
        winner={winner()}
        player={room.player}
        playerHand={playerHand}
        opponent={room.opponent}
        opponentHand={opponentHand}
        invitationLink={invitationLink}
        resultLink={resultLink}
        onReadyClick={ready}
        onHandClick={jankenpon}
      />
    );
  } else {
    return <JankenRoomLoading />;
  }
}

export default RoomPage;
