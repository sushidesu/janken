import { IFirebaseClient } from "./InterfaceFirebaseClient";

export class CreateRoomUsecase {
  public constructor(private firebaseClient: IFirebaseClient) {}

  public async do(props: { userName: string }): Promise<string> {
    const userId = await this.firebaseClient.anonymousLogin();
    if (!userId) {
      console.error("ログインできません");
      throw new Error("login fail");
    }
    const roomId = await this.firebaseClient.createRoom({
      hostUserId: userId,
      hostUserName: props.userName,
    });
    return roomId;
  }
}
