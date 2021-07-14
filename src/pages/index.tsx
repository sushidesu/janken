import { useCallback, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { useJankenRouter } from "../controller/useJankenRouter";
import { useCurrentUserIdContext } from "../hooks/firebase/useCurrentUserId";
import { CreateRoomUsecase } from "../usecase/createRoom";
import { FirebaseClient } from "../infra/firebaseClient";
import { Layout } from "../components/Layout";

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
      <input
        className={clsx("border-2")}
        onBlur={(e) => {
          setName(e.target.value);
        }}
      />
      {userId ? (
        <button onClick={handleClick}>部屋を作成</button>
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
}

export default Index;
