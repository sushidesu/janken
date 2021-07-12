import { database, auth } from "../plugins/firebase";
import {
  IFirebaseClient,
  CreateRoomProps,
  canJoinRoomProps,
  GetUserInRoomProps,
  UserInRoomInputData,
  JoinRoomProps,
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

  public async anonymousLogin(): Promise<string | undefined> {
    if (auth.currentUser?.uid) {
      console.log("already logged in", auth.currentUser.uid);
      return auth.currentUser.uid;
    }

    const credential = await auth.signInAnonymously();
    console.log("login anonymously", credential.user?.uid);
    return credential.user?.uid;
  }

  public async canJoinRoom({
    roomId,
    userId,
  }: canJoinRoomProps): Promise<boolean> {
    const roomRef = database.ref(ROOM_PATH(roomId));
    const snap = await roomRef.once("value");
    if (!snap.exists()) {
      // 部屋が存在しない
      return false;
    }
    if (!userId) {
      // ログイン済みのみ部屋に参加可能
      return false;
    }

    const room = snap.val() as Room;
    if (!room.guestUserId) {
      // 空きがある
      return true;
    } else if (room.guestUserId === userId || room.hostUserId === userId) {
      // すでに入室済み
      return true;
    } else {
      // 空きがない
      return false;
    }
  }

  public async joinRoom({
    roomId,
    userId,
    userName,
    onJoinSuccess,
  }: JoinRoomProps): Promise<boolean> {
    const roomRef = database.ref(ROOM_PATH(roomId));
    const result = await roomRef.transaction(
      (maybeRoom) => {
        if (!maybeRoom) {
          console.log("部屋が存在しません");
          return maybeRoom;
        }
        const room = maybeRoom as Room;
        if (room.guestUserId) {
          console.log("満室です");
          return;
        }
        room["guestUserId"] = userId;
        room["guestUserName"] = userName;
        return room;
      },
      (err, committed) => {
        if (err === null && committed && onJoinSuccess) {
          onJoinSuccess();
        }
      }
    );
    return result.committed as boolean;
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
