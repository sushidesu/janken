import { database, auth } from "../plugins/firebase";
import {
  IFirebaseClient,
  CreateRoomProps,
  JoinRoomProps,
  CanJoinRoomProps,
  ReadyProps,
  JankenPonProps,
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

  public async joinRoom({
    roomId,
    userId,
    userName,
    onJoinSuccess,
    onJoinFailure,
  }: JoinRoomProps): Promise<boolean> {
    const roomRef = database.ref(ROOM_PATH(roomId));
    const result = await roomRef.transaction(
      (maybeRoom) => {
        if (!maybeRoom) {
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
        if (!committed && onJoinFailure) {
          onJoinFailure();
        }
        if (err === null && committed && onJoinSuccess) {
          onJoinSuccess();
        }
      }
    );
    return result.committed as boolean;
  }

  async canJoinRoom({ roomId, userId }: CanJoinRoomProps): Promise<boolean> {
    const roomRef = database.ref(ROOM_PATH(roomId));
    const roomSnapshot = await roomRef.once("value");
    // 部屋が存在しない
    if (!roomSnapshot.exists()) {
      return false;
    }
    const room = roomSnapshot.val() as Room;
    // ホストがいない
    if (!room.hostUserId) {
      return false;
    }

    // ホストまたはゲストの場合のみ参加可能
    if (userId === room.hostUserId) {
      return true;
    } else if (room.guestUserId && userId === room.guestUserId) {
      return true;
    } else {
      return false;
    }
  }

  async ready({ roomId, userId }: ReadyProps): Promise<void> {
    const roomRef = database.ref(ROOM_PATH(roomId));
    await roomRef.transaction((maybeRoom) => {
      if (!maybeRoom) {
        console.log("部屋が存在しません");
        return maybeRoom;
      }

      const room = maybeRoom as Room;
      const { hostUserId, guestUserId } = room;
      if (hostUserId && userId === hostUserId) {
        room["hostReady"] = true;
      }
      if (guestUserId && userId === guestUserId) {
        room["guestReady"] = true;
      }
      return room;
    });
  }

  async jankenpon({ roomId, userId, hand }: JankenPonProps): Promise<void> {
    const roomRef = database.ref(ROOM_PATH(roomId));
    await roomRef.transaction((maybeRoom) => {
      if (!maybeRoom) {
        return maybeRoom;
      }
      const room = maybeRoom as Room;
      const { hostUserId, guestUserId } = room;
      if (hostUserId && userId === hostUserId) {
        room["hostHand"] = hand;
      }
      if (guestUserId && userId === guestUserId) {
        room["guestHand"] = hand;
      }
      return room;
    });
  }
}
