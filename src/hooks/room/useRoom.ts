import { useReducer, Reducer, Dispatch } from "react";

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
  status: RoomStatus;
};
type RoomAction =
  | { type: "enterPlayer"; payload: Omit<User, "ready"> }
  | { type: "enterOpponent"; payload: Omit<User, "ready"> }
  | { type: "readyPlayer" }
  | { type: "readyOpponent" };

const calcStatus = (prev: Room, action: RoomAction): RoomStatus => {
  switch (action.type) {
    case "enterPlayer":
      if (prev.status === "waitingPlayersEnter" && prev.opponent) {
        return "waitingPlayersReady";
      }
      break;
    case "enterOpponent":
      if (prev.status === "waitingPlayersEnter" && prev.player) {
        return "waitingPlayersReady";
      }
      break;
    case "readyPlayer":
      if (prev.status === "waitingPlayersReady" && prev.opponent?.ready) {
        return "waitingPlayersHand";
      }
      break;
    case "readyOpponent":
      if (prev.status === "waitingPlayersReady" && prev.player?.ready) {
        return "waitingPlayersHand";
      }
      break;
    default:
      return prev.status;
  }
  return prev.status;
};

export const useRoom = (): {
  room: Room;
  dispatch: Dispatch<RoomAction>;
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
          status: calcStatus(prev, action),
        };
      case "enterOpponent":
        return {
          ...prev,
          opponent: {
            ...action.payload,
            ready: false,
          },
          status: calcStatus(prev, action),
        };
      case "readyPlayer":
        if (prev.player) {
          return {
            ...prev,
            player: {
              ...prev.player,
              ready: true,
            },
            status: calcStatus(prev, action),
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
            status: calcStatus(prev, action),
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
    status: "waitingPlayersEnter",
  };

  const [room, dispatch] = useReducer(reducer, init);
  return {
    room,
    dispatch,
  };
};
