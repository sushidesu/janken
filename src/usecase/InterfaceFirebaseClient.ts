export type CreateRoomProps = {
  hostUserName: string;
  hostUserId: string;
};

export type canJoinRoomProps = {
  roomId: string;
  userId: string | undefined;
};

export type GetUserInRoomProps = {
  roomId: string;
  userId: string;
};

export class UserInRoomInputData {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly hostOrGuest: "host" | "guest"
  ) {}
}

export interface IFirebaseClient {
  createRoom(props: CreateRoomProps): Promise<string>;
  anonymousLogin(): Promise<string | undefined>;
  canJoinRoom(props: canJoinRoomProps): Promise<boolean>;
  getUserInRoomByUserId(
    props: GetUserInRoomProps
  ): Promise<UserInRoomInputData | undefined>;
}
