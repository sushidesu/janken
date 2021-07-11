import { IFirebaseClient } from "./InterfaceFirebaseClient";

export class GetUserInRoomOutputData {
  constructor(public readonly id: string, public readonly name: string) {}
}

export class GetUserInRoomUsecase {
  public constructor(private firebaseClient: IFirebaseClient) {}

  public async get({
    userId,
    roomId,
  }: {
    userId: string;
    roomId: string;
  }): Promise<GetUserInRoomOutputData | undefined> {
    const user = await this.firebaseClient.getUserInRoomByUserId({
      roomId,
      userId,
    });

    if (user) {
      return new GetUserInRoomOutputData(user.id, user.name);
    } else {
      return undefined;
    }
  }
}
