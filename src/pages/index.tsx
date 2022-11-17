import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Pay Scaffold</title>
        <meta
          name="description"
          content="Solana Pay Scaffold"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
