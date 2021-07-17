import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useState } from "react";
import clsx from "clsx";
import { useJankenRouter } from "../../controller/useJankenRouter";
import { useCurrentUserIdContext } from "../../hooks/firebase/useCurrentUserId";
import { useUserNameInput } from "../../hooks/useUserNameInput";
import { FirebaseClient } from "../../infra/firebaseClient";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

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

  const router = useJankenRouter();
  const userId = useCurrentUserIdContext();
  const firebaseClient = new FirebaseClient();

  const [loading, setLoading] = useState<boolean>(false);
  const { name, disabled, error, message, handleChange } = useUserNameInput();

  const join = async () => {
    if (userId) {
      setLoading(true);
      await firebaseClient.joinRoom({
        roomId: rid,
        userId: userId,
        userName: name,
        onJoinSuccess: () => {
          console.log("success!!");
          router.push({ page: "room", roomId: rid });
        },
        onJoinFailure: () => {
          console.log("failure");
          window.alert("部屋が満室です");
          router.push({ page: "top" });
        },
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <div className={clsx("mt-10")}>
        <Input
          label={"プレイヤー名"}
          placeholder={"じゃんけんマニア"}
          onChange={handleChange}
          error={error}
          message={message}
        />
      </div>
      <div className={clsx("mt-10")}>
        <Button disabled={disabled} loading={!userId || loading} onClick={join}>
          部屋に参加する
        </Button>
      </div>
    </Layout>
  );
}

export default JoinPage;
