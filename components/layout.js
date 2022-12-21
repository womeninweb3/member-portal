import Head from "next/head";
import Header from "./header";
import layoutStyles from "../pages/styles/components/layout.js"

const Layout = (props) => (
  <>
    <Head>
      <title>WOMEN IN WEB3</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />
    <main>
      <div className="container">{props.children}</div>
    </main>
    <style jsx global>
      {layoutStyles}
    </style>
  </>
);

export default Layout;
