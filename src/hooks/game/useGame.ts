import { useState } from "react";
import { User } from "../janken/user";

export type GameStatus = "waiting" | "ready" | "game" | "result";

export type UseGameResponse = {
  you: User;
  opponent: User;
  status: GameStatus;
};

export const useGame = (): UseGameResponse => {
  const [status] = useState<GameStatus>("waiting");
  const A = new User("a", "自分");
  const B = new User("b", "相手");

  return {
    you: A,
    opponent: B,
    status,
  };
};
