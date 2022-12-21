import { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { UserContext } from "../lib/UserContext";

// Styles
import headerStyles from "../pages/styles/components/header.js"
import { Button } from "@material-tailwind/react"

// Initialize the Magic x Ethers Provider
import { Magic } from "magic-sdk";
import { ethers } from "ethers";

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    if (typeof window !== "undefined") {
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

      const maticEthersProvider = new ethers.providers.Web3Provider(
        magicMatic.rpcProvider
      );

      magicMatic.user.logout().then(() => {
        setUser({ user: null });
        Router.push("/login");
      });
    }
  };

  return (
    <header>
      <nav>
        <ul>
          {user?.loading ? (
            // If loading, don't display any buttons specific to the loggedIn state
            <div
              style={{
                height: "38px",
              }}
            ></div>
          ) : user?.issuer ? (
            <>
              <li>
                <Link href="/">
                  <Button className="header-button">Home</Button>
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <Button className="header-button">Profile</Button>
                </Link>
              </li>
              <li>
                <a onClick={logout} className="button">
                  <Button className="header-button">Logout</Button>
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>
        {headerStyles}
      </style>
    </header>
  );
};

export default Header;
