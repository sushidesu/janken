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
  playerA: User,
  playerB: User
): {
  value: JankenPonResponse;
  playerAHand: Hand;
  playerBHand: Hand;
  ponPlayerA: Pon;
  ponPlayerB: Pon;
} => {
  const [playerAHand, setPlayerAHand] = useState<Hand | undefined>(undefined);
  const [playerBHand, setPlayerBHand] = useState<Hand | undefined>(undefined);

  const roomRef = database.ref("rooms/testroom");

  useEffect(() => {
    console.log("on");
    roomRef
      .child("hands")
      .limitToLast(1)
      .on("child_added", (snap) => {
        const value = snap.val() as History;
        console.log(value);
        if (value.user === playerA.id) {
          setPlayerAHand(value.hand);
        } else {
          setPlayerBHand(value.hand);
        }
      });

    return () => {
      console.log("off");
      roomRef.child("hands").off();
    };
  }, []);

  const ponPlayerA = useCallback((hand: Hand) => {
    roomRef.child("hands").push({
      hand: hand,
      user: playerA.id,
    });
  }, []);
  const ponPlayerB = useCallback((hand: Hand) => {
    roomRef.child("hands").push({
      hand: hand,
      user: playerB.id,
    });
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
  };
};
