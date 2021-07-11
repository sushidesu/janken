import { IFirebaseClient } from "./InterfaceFirebaseClient";

export class GetCurrentUserOutputData {
  constructor(public readonly id: string, public readonly name: string) {}
}

export class GetCurrentUserUsecase {
  public constructor(private firebaseClient: IFirebaseClient) {}

  public async get(
    roomId: string
  ): Promise<GetCurrentUserOutputData | undefined> {
    const getId = () => "test";

    const id = getId();
    const user = await this.firebaseClient.getUserInRoomByUserId({
      roomId,
      userId: id,
    });

    if (user) {
      return new GetCurrentUserOutputData(user.id, user.name);
    } else {
      return undefined;
    }
  }
}
