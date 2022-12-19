import { useState, useEffect } from "react";
import { UserContext } from "../lib/UserContext";
import Router from "next/router";
import Layout from "../components/layout";

// Initialize the Magic x Ethers Provider
import { Magic } from "magic-sdk";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  if (typeof window !== "undefined") {
    // Configure Custom Node: Testnet Polygon
    const polygonNodeOptions = {
      rpcUrl: "https://rpc-mumbai.maticvigil.com/", // Polygon RPC URL
      chainId: 80001, // Polygon chain ID
    };

    const magicMatic = new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
      {
        network: polygonNodeOptions,
      }
    );
    magicMatic.network = "matic";

    // If isLoggedIn is true, set the UserContext with user data
    // Otherwise, redirect to /login and set UserContext to { user: null }
    useEffect(() => {
      setUser({ loading: true });
      magicMatic.user.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          magicMatic.user.getMetadata().then((userData) => setUser(userData));
        } else {
          Router.push("/login");
          setUser({ user: null });
        }
      });
    }, []);

    return (
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={[user, setUser]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    );
  }
}

export default MyApp;
