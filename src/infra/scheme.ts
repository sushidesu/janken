/*
(root)
  - rooms
    - [roomID]: Room | undefined
      - hands
        - [id]: HandHistory | undefined
          - hand: HandString
          - userId: string
      - host: User | undefined
      - guest: User | undefined
*/

export const ROOM_ROOT_NAME = "rooms";
export const ROOM_PATH = (roomId: string): string =>
  `${ROOM_ROOT_NAME}/${roomId}`;
export const HAND_ROOT_NAME = "hands";
export const HAND_ROOT_PATH = (roomId: string): string =>
  `${ROOM_PATH(roomId)}/${HAND_ROOT_NAME}`;

export type KeyValue<T> = {
  [id: string]: T;
};

export type Room = {
  hands?: KeyValue<HandHistory>;
  hostUserId: string | undefined;
  hostUserName: string | undefined;
  hostReady?: boolean;
  guestUserId?: string;
  guestUserName?: string;
  guestReady?: boolean;
};

export type HandHistory = {
  userId: string;
  hand: string;
};
