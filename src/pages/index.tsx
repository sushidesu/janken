import { useState, useCallback } from "react";
import Head from "next/head";
import clsx from "clsx";
import { useJankenRouter } from "../controller/useJankenRouter";
import { useCurrentUserIdContext } from "../hooks/firebase/useCurrentUserId";
import { useUserNameInput } from "../hooks/useUserNameInput";
import { CreateRoomUsecase } from "../usecase/createRoom";
import { FirebaseClient } from "../infra/firebaseClient";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

function Index(): JSX.Element {
  const { name, disabled, error, message, handleChange } = useUserNameInput();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useJankenRouter();
  const userId = useCurrentUserIdContext();

  const firebaseClient = new FirebaseClient();
  const createRoom = new CreateRoomUsecase(firebaseClient);

  const handleClick = useCallback(async () => {
    if (name !== "" && userId) {
      setLoading(true);
      const roomId = await createRoom.do({
        userId: userId,
        userName: name,
      });
      router.push({ page: "room", roomId });
    }
  }, [createRoom, router, name]);

  return (
    <Layout>
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <div className={clsx("mt-10")}>
        <Input
          label={"プレイヤー名"}
          placeholder={"ほげ太郎"}
          onChange={handleChange}
          error={error}
          message={message}
        />
      </div>
      <div className={clsx("mt-10")}>
        <Button
          disabled={disabled}
          loading={!userId || loading}
          onClick={handleClick}
        >
          部屋を作成
        </Button>
      </div>
    </Layout>
  );
}

export default Index;
