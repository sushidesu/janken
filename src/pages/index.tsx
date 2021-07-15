import { useCallback, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { useJankenRouter } from "../controller/useJankenRouter";
import { useCurrentUserIdContext } from "../hooks/firebase/useCurrentUserId";
import { CreateRoomUsecase } from "../usecase/createRoom";
import { FirebaseClient } from "../infra/firebaseClient";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";

function Index(): JSX.Element {
  const [name, setName] = useState<string>("");
  const router = useJankenRouter();
  const userId = useCurrentUserIdContext();

  const firebaseClient = new FirebaseClient();
  const createRoom = new CreateRoomUsecase(firebaseClient);

  const handleClick = useCallback(async () => {
    if (name !== "" && userId) {
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
        <input
          className={clsx("border-2")}
          onBlur={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={clsx("mt-10")}>
        <Button disabled={name === ""} loading={!userId} onClick={handleClick}>
          部屋を作成
        </Button>
      </div>
    </Layout>
  );
}

export default Index;
