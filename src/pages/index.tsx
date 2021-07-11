import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useCurrentUserIdContext } from "../hooks/firebase/useCurrentUserId";
import { CreateRoomUsecase } from "../usecase/createRoom";
import { FirebaseClient } from "../infra/firebaseClient";

function Index(): JSX.Element {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const userId = useCurrentUserIdContext();

  const firebaseClient = new FirebaseClient();
  const createRoom = new CreateRoomUsecase(firebaseClient);

  const handleClick = useCallback(async () => {
    if (name !== "" && userId) {
      const roomId = await createRoom.do({
        userId: userId,
        userName: name,
      });
      router.push(`/r/${roomId}`);
    }
  }, [createRoom, router, name]);

  return (
    <div
      className={clsx(
        "max-w-md",
        "mx-auto",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
      )}
    >
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <h1 className={clsx("mt-10", "font-bold", "text-xl")}>Janken</h1>
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
    </div>
  );
}

export default Index;
