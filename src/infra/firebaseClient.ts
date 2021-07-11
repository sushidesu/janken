import { database } from "../plugins/firebase";
import {
  IFirebaseClient,
  CreateRoomProps,
} from "../usecase/InterfaceFirebaseClient";
import { Room, ROOM_ROOT_NAME } from "./scheme";

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
}
