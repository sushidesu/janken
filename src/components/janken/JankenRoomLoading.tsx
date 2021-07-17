import Head from "next/head";
import clsx from "clsx";
import { Layout } from "../Layout";
import { Loading } from "../Loading";

export function JankenRoomLoading(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <div className={clsx("mt-20")}>
        <Loading margin={5} />
        <p className={clsx("mt-5", "text-center", "text-gray-500")}>
          読み込み中...
        </p>
      </div>
    </Layout>
  );
}
