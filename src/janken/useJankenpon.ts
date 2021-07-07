import { useCallback, useState } from "react";
import { Hand, JankenHand } from "./jankenHand";
import { JankenResult } from "./jankenResult";
import { User } from "./user";
import { Janken } from "./janken";

type Pon = (hand: Hand) => void;

type JankenPonResponse =
  | {
      status: "waiting";
      ponPlayerA: Pon;
      ponPlayerB: Pon;
    }
  | {
      status: "done";
      result: JankenResult;
      ponPlayerA: Pon;
      ponPlayerB: Pon;
    };

export const useJankenpon = (
  playerA: User,
  playerB: User
): JankenPonResponse => {
  const [playerAHand, setPlayerAHand] = useState<Hand | undefined>(undefined);
  const [playerBHand, setPlayerBHand] = useState<Hand | undefined>(undefined);

  const ponPlayerA = useCallback((hand: Hand) => {
    setPlayerAHand(hand);
  }, []);
  const ponPlayerB = useCallback((hand: Hand) => {
    setPlayerBHand(hand);
  }, []);

  if (!playerAHand || !playerBHand) {
    return {
      status: "waiting",
      ponPlayerA,
      ponPlayerB,
    };
  }

  const janken = new Janken(playerA, playerB);
  const result = janken.pon(
    new JankenHand(playerAHand),
    new JankenHand(playerBHand)
  );
  setPlayerAHand(undefined);
  setPlayerBHand(undefined);
  return {
    status: "done",
    result,
    ponPlayerA,
    ponPlayerB,
  };
};
