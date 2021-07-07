import { useCallback, useState } from "react";
import { Hand, JankenHand } from "./jankenHand";
import { JankenResult } from "./jankenResult";
import { User } from "./user";
import { Janken } from "./janken";

type Pon = (hand: Hand) => void;

type JankenPonResponse =
  | {
      status: "waiting";
    }
  | {
      status: "done";
      result: JankenResult;
    };

export const useJankenpon = (
  playerA: User,
  playerB: User
): {
  value: JankenPonResponse;
  playerAHand: Hand;
  playerBHand: Hand;
  ponPlayerA: Pon;
  ponPlayerB: Pon;
  reset: () => void;
} => {
  const [playerAHand, setPlayerAHand] = useState<Hand | undefined>(undefined);
  const [playerBHand, setPlayerBHand] = useState<Hand | undefined>(undefined);

  const ponPlayerA = useCallback((hand: Hand) => {
    setPlayerAHand(hand);
  }, []);
  const ponPlayerB = useCallback((hand: Hand) => {
    setPlayerBHand(hand);
  }, []);
  const reset = useCallback(() => {
    setPlayerAHand(undefined);
    setPlayerBHand(undefined);
  }, []);

  if (!playerAHand || !playerBHand) {
    return {
      value: {
        status: "waiting",
      },
      ponPlayerA,
      playerAHand,
      ponPlayerB,
      playerBHand,
      reset,
    };
  }

  const janken = new Janken(playerA, playerB);
  const result = janken.pon(
    new JankenHand(playerAHand),
    new JankenHand(playerBHand)
  );
  return {
    value: {
      status: "done",
      result,
    },
    ponPlayerA,
    playerAHand,
    ponPlayerB,
    playerBHand,
    reset,
  };
};
