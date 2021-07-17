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

export type Room = {
  hostUserId: string | undefined;
  hostUserName: string | undefined;
  hostReady?: boolean;
  hostHand?: string | undefined;
  guestUserId?: string;
  guestUserName?: string;
  guestReady?: boolean;
  guestHand?: string | undefined;
};
