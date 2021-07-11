export type CreateRoomProps = {
  hostUserName: string;
  hostUserId: string;
};

export interface IFirebaseClient {
  createRoom(props: CreateRoomProps): Promise<string>;
}
