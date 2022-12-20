import { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { UserContext } from "../lib/UserContext";

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
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <a onClick={logout} className="button">
                  Logout
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
      <style jsx>{`
        nav {
          max-width: 45rem;
          margin: 0 auto 50px;
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }
        ul {
          display: flex;
          list-style: none;
        }
        li {
          margin-right: 1.5rem;
          line-height: 38px;
        }
        li:first-child {
          margin-left: auto;
        }
        .button {
          background: none !important;
          border: none;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Header;
