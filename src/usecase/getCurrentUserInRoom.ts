import { IFirebaseClient } from "./InterfaceFirebaseClient";

export class GetCurrentUserOutputData {
  constructor(public readonly id: string, public readonly name: string) {}
}

export class GetCurrentUserInRoomUsecase {
  public constructor(private firebaseClient: IFirebaseClient) {}

  public async get({
    userId,
    roomId,
  }: {
    userId: string;
    roomId: string;
  }): Promise<GetCurrentUserOutputData | undefined> {
    const user = await this.firebaseClient.getUserInRoomByUserId({
      roomId,
      userId,
    });

    if (user) {
      return new GetCurrentUserOutputData(user.id, user.name);
    } else {
      return undefined;
    }
  }
}
