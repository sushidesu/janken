import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import clsx from "clsx";
import { CreateRoomUsecase } from "../usecase/createRoom";
import { FirebaseClient } from "../infra/firebaseClient";

function Index(): JSX.Element {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const firebaseClient = new FirebaseClient();
  const createRoom = new CreateRoomUsecase(firebaseClient);

  const handleClick = useCallback(async () => {
    if (name !== "") {
      const roomId = await createRoom.do({
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
      <button onClick={handleClick}>部屋を作成</button>
    </div>
  );
}

export default Index;
