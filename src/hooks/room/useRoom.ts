import { useReducer, Reducer, Dispatch } from "react";

type User = {
  id: string;
  name: string;
  ready: boolean;
};
type Room = {
  player: User | undefined;
  opponent: User | undefined;
};
type RoomAction =
  | { type: "enterPlayer"; payload: Omit<User, "ready"> }
  | { type: "enterOpponent"; payload: Omit<User, "ready"> }
  | { type: "readyPlayer" }
  | { type: "readyOpponent" };

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
        } else {
          return prev;
        }
      case "readyOpponent":
        if (prev.opponent) {
          return {
            ...prev,
            opponent: {
              ...prev.opponent,
              ready: true,
            },
          };
        } else {
          return prev;
        }
      default:
        return prev;
    }
  };

  const init: Room = {
    player: undefined,
    opponent: undefined,
  };

  const [room, dispatch] = useReducer(reducer, init);
  return {
    room,
    dispatch,
  };
};
