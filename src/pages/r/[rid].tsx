import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import clsx from "clsx";
import { GetCurrentUserUsecase } from "../../usecase/getCurrentUser";
import { FirebaseClient } from "../../infra/firebaseClient";
import { useRoom } from "../../hooks/room/useRoom";
import { UserName } from "../../components/UserName";

type Props = {
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

function RoomPage({
  roomId,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const rid = roomId ?? "";
  const firebaseClient = new FirebaseClient();
  const getCurrentUser = new GetCurrentUserUsecase(firebaseClient);

  const { room, dispatch } = useRoom();

  useEffect(() => {
    let unmounted = false;

    const fetcher = async () => {
      const currentUser = await getCurrentUser.get(rid);
      if (!unmounted) {
        if (!currentUser) {
          window.alert("部屋に入れませんでした");
        } else {
          dispatch({
            type: "enterPlayer",
            payload: {
              id: currentUser.id,
              name: currentUser.name,
            },
          });
        }
      }
    };
    fetcher();

    return () => {
      unmounted = true;
    };
  }, []);

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

      <div className={clsx("mt-10", "flex", "space-x-10")}>
        <div>
          <p>自分</p>
          <UserName name={room.player?.name} />
        </div>
        <div>
          <p>相手</p>
          <UserName name={room.opponent?.name} />
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
