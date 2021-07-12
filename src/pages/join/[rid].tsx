import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import clsx from "clsx";
import { useJankenRouter } from "../../controller/useJankenRouter";
import { useCurrentUserIdContext } from "../../hooks/firebase/useCurrentUserId";
import { FirebaseClient } from "../../infra/firebaseClient";

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
  // eslint-disable-next-line
  const router = useJankenRouter();
  const userId = useCurrentUserIdContext();
  const firebase = new FirebaseClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const disabled = (): boolean => {
    if (!userId) {
      return true;
    }
    if (name === "") {
      return true;
    }
    return false;
  };

  const join = async () => {
    if (userId) {
      setLoading(true);
      await firebase.joinRoom({
        roomId: rid,
        userId: userId,
        userName: name,
        onJoinSuccess: () => {
          console.log("success!!");
        },
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Janken</h1>
      <div className={clsx("mt-10")}>
        <input
          className={clsx("border-2", "block")}
          onBlur={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          disabled={disabled() || loading}
          className={clsx("mt-5", "bg-blue-300", "disabled:opacity-50")}
          onClick={join}
        >
          部屋に参加する
        </button>
      </div>
    </div>
  );
}

export default JoinPage;
