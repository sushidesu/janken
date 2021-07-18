import clsx from "clsx";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { HeadWithMetadata } from "../../components/HeadWithMetadata";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";

type Props = {
  queryString: string;
};

const flatten = (value: string | string[] | undefined): string => {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value) && value.length) {
    return value[0];
  } else {
    return "";
  }
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { result, playerName, opponentName, playerHand, opponentHand } =
    context.query || {};
  const queryString = [
    "result=" + flatten(result),
    "playerName=" + flatten(playerName),
    "playerHand=" + flatten(playerHand),
    "opponentName=" + flatten(opponentName),
    "opponentHand=" + flatten(opponentHand),
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
