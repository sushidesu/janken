import Head from "next/head";
import { Layout } from "../Layout";

export function JankenRoomLoading(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>じゃんけんオンライン</title>
      </Head>
      <div>loading...</div>
    </Layout>
  );
}
