import { useState, useEffect } from "react";
import { FirebaseClient } from "../infra/firebaseClient";

export type UseIdCheckProps = {
  roomId: string;
  currentUserId: string | undefined;
  onFailure?: () => void;
};

export const useCheckCanJoinRoom = ({
  roomId,
  currentUserId,
  onFailure,
}: UseIdCheckProps): boolean => {
  const [idChecked, setIdChecked] = useState<boolean>(false);
  const firebaseClient = new FirebaseClient();

  // 部屋に参加可能かを確認する
  useEffect(() => {
    let unmounted = false;
    if (currentUserId) {
      const start = async () => {
        const joinable = await firebaseClient.canJoinRoom({
          roomId,
          userId: currentUserId,
        });
        if (!joinable && onFailure) {
          onFailure();
        } else {
          if (!unmounted) {
            setIdChecked(true);
          }
        }
      };
      start();
    }
    return () => {
      unmounted = true;
    };
  }, [currentUserId]);

  return idChecked;
};
