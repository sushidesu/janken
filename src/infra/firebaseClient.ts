import { database } from "../plugins/firebase";
import {
  IFirebaseClient,
  CreateRoomProps,
  GetUserInRoomProps,
  UserInRoomInputData,
} from "../usecase/InterfaceFirebaseClient";
import { Room, ROOM_PATH, ROOM_ROOT_NAME } from "./scheme";

export class FirebaseClient implements IFirebaseClient {
  async createRoom({
    hostUserId,
    hostUserName,
  }: CreateRoomProps): Promise<string> {
    const newRoom: Room = {
      hostUserId: hostUserId,
      hostUserName: hostUserName,
    };
    const newRoomRef = database.ref(ROOM_ROOT_NAME).push(newRoom);
    return (await newRoomRef.key) as string; // roomはrootではないのでキャストできる
  }
  async getUserInRoomByUserId({
    roomId,
    userId,
  }: GetUserInRoomProps): Promise<UserInRoomInputData | undefined> {
    const path = ROOM_PATH(roomId);
    const roomSnap = await database.ref(path).once("value");
    const room = roomSnap.val() as Room | undefined;
    console.log({
      path: path,
      exist: roomSnap.exists(),
      value: room,
    });
    if (!room) {
      return undefined;
    }
    if (room.hostUserId === userId) {
      // host
      const name = room.hostUserName ?? "";
      return new UserInRoomInputData(userId, name, "host");
    } else if (room.guestUserId === userId) {
      // guest
      const name = room.guestUserName ?? "";
      return new UserInRoomInputData(userId, name, "guest");
    } else {
      // 存在しない
      return undefined;
    }
  }
}
