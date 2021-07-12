import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useCurrentUserIdContext } from "../../hooks/firebase/useCurrentUserId";
import { FirebaseClient } from "../../infra/firebaseClient";
import { useEffect } from "react";

export type Props = {
  roomId: string | undefined;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { rid } = context.query;
  if (typeof rid === "string") {
    return {
      props: {
        roomId: rid,
      },
    };
  } else {
    return {
      props: {
        roomId: undefined,
      },
    };
  }
};

function JoinPage({
  roomId,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const rid = roomId ?? "";
  const router = useRouter();
  const userId = useCurrentUserIdContext();
  const firebase = new FirebaseClient();

  useEffect(() => {
    if (firebase.canJoinRoom({ roomId: rid, userId })) {
      console.log("参加可能");
      router.push(`/r/${rid}`);
    } else {
      console.log("参加不可能");
    }
  }, [userId]);

  return (
    <div>
      <h1>Janken</h1>
      <div className={clsx("mt-10")}>
        <p>部屋に参加中...</p>
      </div>
    </div>
  );
}

export default JoinPage;
