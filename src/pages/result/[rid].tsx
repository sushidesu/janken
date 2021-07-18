import clsx from "clsx";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { HeadWithMetadata } from "../../components/HeadWithMetadata";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { auth, database } from "../../plugins/firebase";
import { ROOM_PATH, Room } from "../../infra/scheme";
import { Janken } from "../../hooks/janken/janken";
import { JankenHand, Hand } from "../../hooks/janken/jankenHand";

type Props = {
  queryString: string;
};

const cast = (val: string | undefined): Hand => {
  switch (val) {
    case "rock":
      return "rock";
    case "paper":
      return "paper";
    case "scissors":
      return "scissors";
    default:
      return "rock";
  }
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { rid } = context.query;
  const roomId = typeof rid === "string" ? rid : "";
  await auth.signInWithEmailAndPassword(
    process.env.USERNAME ?? "",
    process.env.PASSWORD ?? ""
  );
  const roomRef = database.ref(ROOM_PATH(roomId));
  const snap = await roomRef.once("value");
  const room = snap.val() as Room | undefined;
  const result = () => {
    const janken = new Janken();
    const res = janken.pon(
      new JankenHand(cast(room?.hostHand)),
      new JankenHand(cast(room?.guestHand))
    );
    if (res.type === "game") {
      return res.winner.user === "player" ? "l" : "r";
    } else {
      return "d";
    }
  };

  const queryString = [
    "rs=" + result(),
    "l=" + room?.hostUserName,
    "lh=" + room?.hostHand,
    "r=" + room?.guestUserName,
    "rh=" + room?.guestHand,
  ].join("&");
  return {
    props: {
      queryString,
    },
  };
};

function ResultPage({
  queryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout>
      <HeadWithMetadata
        cardType="summary_large_image"
        ogp={`janken-ogp.vercel.app/result.png?${queryString}`}
      />
      <div className={clsx("mt-20", "mb-10")}>
        <Loading />
      </div>
    </Layout>
  );
}

export default ResultPage;
