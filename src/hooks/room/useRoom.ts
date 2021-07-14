import { useState, useEffect, useReducer, Reducer, Dispatch } from "react";

type User = {
  id: string;
  name: string;
  ready: boolean;
};
export type RoomStatus =
  | "waitingPlayersEnter"
  | "waitingPlayersReady"
  | "waitingPlayersHand"
  | "result";
export type Room = {
  player: User | undefined;
  opponent: User | undefined;
};
type RoomAction =
  | { type: "enterPlayer"; payload: Omit<User, "ready"> }
  | { type: "enterOpponent"; payload: Omit<User, "ready"> }
  | { type: "readyPlayer" }
  | { type: "readyOpponent" };

type CurrentRoomValue = {
  hostId: string | undefined;
  guestId: string | undefined;
  hostReady: boolean | undefined;
  guestReady: boolean | undefined;
  hostHand: string | undefined;
  guestHand: string | undefined;
};

export const useRoom = (
  currentValue: CurrentRoomValue
): {
  room: Room;
  dispatch: Dispatch<RoomAction>;
  status: RoomStatus;
} => {
  const reducer: Reducer<Room, RoomAction> = (prev, action) => {
    switch (action.type) {
      case "enterPlayer":
        return {
          ...prev,
          player: {
            ...action.payload,
            ready: false,
          },
        };
      case "enterOpponent":
        return {
          ...prev,
          opponent: {
            ...action.payload,
            ready: false,
          },
        };
      case "readyPlayer":
        if (prev.player) {
          return {
            ...prev,
            player: {
              ...prev.player,
              ready: true,
            },
          };
        }
        break;
      case "readyOpponent":
        if (prev.opponent) {
          return {
            ...prev,
            opponent: {
              ...prev.opponent,
              ready: true,
            },
          };
        }
        break;
      default:
        return prev;
    }
    return prev;
  };

  const init: Room = {
    player: undefined,
    opponent: undefined,
  };

  const [room, dispatch] = useReducer(reducer, init);
  const [status, setStatus] = useState<RoomStatus>("waitingPlayersEnter");
  useEffect(() => {
    const { hostId, guestId, hostReady, guestReady, hostHand, guestHand } =
      currentValue;
    if (hostHand && guestHand) {
      setStatus("result");
    } else if (hostReady && guestReady) {
      setStatus("waitingPlayersHand");
    } else if (hostId && guestId) {
      setStatus("waitingPlayersReady");
    } else {
      setStatus("waitingPlayersEnter");
    }
  }, [currentValue]);
  return {
    room,
    dispatch,
    status,
  };
};
