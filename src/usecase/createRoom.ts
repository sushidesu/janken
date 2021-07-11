import { IFirebaseClient } from "./InterfaceFirebaseClient";

export class CreateRoomUsecase {
  public constructor(private firebaseClient: IFirebaseClient) {}

  public async do(props: {
    userId: string;
    userName: string;
  }): Promise<string> {
    const roomId = await this.firebaseClient.createRoom({
      hostUserId: props.userId,
      hostUserName: props.userName,
    });
    return roomId;
  }
}
