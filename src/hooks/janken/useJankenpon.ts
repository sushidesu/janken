import { useEffect, useState } from "react";
import { Hand, JankenHand } from "./jankenHand";
import { JankenResult } from "./jankenResult";
import { Janken } from "./janken";

export type UseJankenPonProps = {
  currentUserId: string | undefined;
  hostId: string | undefined;
  guestId: string | undefined;
  hostHand: string | undefined;
  guestHand: string | undefined;
};

export type UseJankenPonResponse = {
  result: { status: "waiting" } | { status: "game"; value: JankenResult };
  playerHand: Hand | undefined;
  opponentHand: Hand | undefined;
};

const castHand = (maybeHand: string): Hand => {
  if (
    maybeHand === "rock" ||
    maybeHand === "paper" ||
    maybeHand === "scissors"
  ) {
    return maybeHand;
  } else {
    return "rock";
  }
};

export const useJankenpon = ({
  currentUserId,
  hostId,
  guestId,
  hostHand,
  guestHand,
}: UseJankenPonProps): UseJankenPonResponse => {
  const [playerHand, setPlayerHand] = useState<Hand | undefined>(undefined);
  const [opponentHand, setOpponentHand] = useState<Hand | undefined>(undefined);

  useEffect(() => {
    if (currentUserId) {
      if (hostHand) {
        if (currentUserId === hostId) {
          setPlayerHand(castHand(hostHand));
        } else {
          setOpponentHand(castHand(hostHand));
        }
      }
      if (guestHand) {
        if (currentUserId === guestId) {
          setPlayerHand(castHand(guestHand));
        } else {
          setOpponentHand(castHand(guestHand));
        }
      }
    }
  }, [currentUserId, hostHand, guestHand, hostId, guestId]);

  if (!playerHand || !opponentHand) {
    return {
      playerHand,
      opponentHand,
      result: {
        status: "waiting",
      },
    };
  }

  const janken = new Janken();
  const result = janken.pon(
    new JankenHand(playerHand),
    new JankenHand(opponentHand)
  );

  return {
    playerHand,
    opponentHand,
    result: {
      status: "game",
      value: result,
    },
  };
};
