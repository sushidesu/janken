import { useEffect, useCallback, useState } from "react";
import { database } from "../plugins/firebase";
import { Hand, JankenHand } from "./jankenHand";
import { JankenResult } from "./jankenResult";
import { User } from "./user";
import { Janken } from "./janken";

type Pon = (hand: Hand) => void;

type JankenPonResponse =
  | {
      status: "waiting" | "loading";
    }
  | {
      status: "done";
      result: JankenResult;
    };

type History = {
  hand: Hand;
  user: string;
};

export const useJankenpon = (
  roomId: string,
  playerA: User,
  playerB: User
): {
  value: JankenPonResponse;
  playerAHand: Hand | undefined;
  playerBHand: Hand | undefined;
  ponPlayerA: Pon;
  disable: boolean;
} => {
  const [disable, setDisable] = useState<boolean>(false);
  const [playerAHand, setPlayerAHand] = useState<Hand | undefined>(undefined);
  const [playerBHand, setPlayerBHand] = useState<Hand | undefined>(undefined);

  const roomRef = database.ref(`room/${roomId}`);
  const HAND_PATH = "hand";

  useEffect(() => {
    console.log("on");
    roomRef
      .child(HAND_PATH)
      .limitToLast(2)
      .on("child_added", (snap) => {
        const value = snap.val() as History;
        console.log(value);
        if (value.user === playerA.id) {
          setDisable(true);
          setPlayerAHand(value.hand);
        } else {
          setPlayerBHand(value.hand);
        }
      });

    return () => {
      console.log("off");
      roomRef.child(HAND_PATH).off();
    };
  }, []);

  const ponPlayerA = useCallback((hand: Hand) => {
    roomRef.child(HAND_PATH).push({
      hand: hand,
      user: playerA.id,
    });
  }, []);

  if (!playerAHand || !playerBHand) {
    return {
      value: {
        status: "waiting",
      },
      ponPlayerA,
      playerAHand,
      playerBHand,
      disable,
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
    playerBHand,
    disable,
  };
};
