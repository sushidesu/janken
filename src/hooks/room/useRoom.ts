import { useReducer, Reducer, Dispatch } from "react";

type User = {
  id: string;
  name: string;
};
type Room = {
  player: User | undefined;
  opponent: User | undefined;
};
type RoomAction =
  | { type: "enterPlayer"; payload: User }
  | { type: "enterOpponent"; payload: User };

export const useRoom = (): {
  room: Room;
  dispatch: Dispatch<RoomAction>;
} => {
  const reducer: Reducer<Room, RoomAction> = (prev, action) => {
    switch (action.type) {
      case "enterPlayer":
        return {
          ...prev,
          player: action.payload,
        };
      case "enterOpponent":
        return {
          ...prev,
          opponent: action.payload,
        };
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
