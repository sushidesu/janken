export type CreateRoomProps = {
  hostUserName: string;
  hostUserId: string;
};

export type JoinRoomProps = {
  roomId: string;
  userId: string;
  userName: string;
  onJoinSuccess?: () => void;
};

export type ReadyProps = {
  roomId: string;
  userId: string;
};

export type JankenPonProps = {
  roomId: string;
  userId: string;
  hand: "rock" | "paper" | "scissors";
};

export interface IFirebaseClient {
  createRoom(props: CreateRoomProps): Promise<string>;
  anonymousLogin(): Promise<string | undefined>;
  joinRoom(props: JoinRoomProps): Promise<boolean>;
  ready(props: ReadyProps): Promise<void>;
  jankenpon(props: JankenPonProps): Promise<void>;
}
