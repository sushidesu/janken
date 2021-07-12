import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import clsx from "clsx";

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
  console.log(rid);

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
