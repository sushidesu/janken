import { database } from "../../plugins/firebase";
import { ROOM_PATH, Room } from "../../infra/scheme";
import { useEffect, useState } from "react";

export const useRoomValue = (roomId: string): Room | undefined => {
  const [roomValue, setRoomValue] = useState<Room | undefined>(undefined);
  const roomRef = database.ref(ROOM_PATH(roomId));

  // 初期値
  useEffect(() => {
    const unmounted = false;

    const fetcher = async () => {
      const snap = await roomRef.once("value");
      const room = snap.val() as Room | undefined;
      if (!unmounted) {
        setRoomValue(room);
      }
    };
    fetcher();

    return () => {
      unmounted;
    };
  }, []);

  // 変更を監視
  useEffect(() => {
    const callback = roomRef.on("value", (snap) => {
      const value = snap.val() as Room;
      setRoomValue(value);
    });

    return () => {
      roomRef.off("value", callback);
    };
  }, []);

  return roomValue;
};
