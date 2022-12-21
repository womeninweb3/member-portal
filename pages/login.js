import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import { UserContext } from "../lib/UserContext";
import EmailForm from "../components/email-form";
// Initialize the Magic x Ethers Provider
import { Magic } from "magic-sdk";
import { getUser } from "../lib/getUser";
import { createUser } from "../lib/createUser";

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);

  // Redirect to Home if the user is logged in
  useEffect(() => {
    user?.issuer && Router.push("/");
  }, [user]);

  if (typeof window !== "undefined") {
    // Testing Airtable
    getUser();
    createUser();

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

    async function handleLoginWithEmail(email) {
      try {
        setDisabled(true); // disable login button to prevent multiple emails from being triggered

        // Trigger Magic link to be sent to user
        let didToken = await magicMatic.auth.loginWithMagicLink({
          email,
        });

        // Validate didToken with server
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + didToken,
          },
        });
      } catch (error) {
        setDisabled(false); // re-enable login button - user may have requested to edit their email
        console.log(error);
      }
    }

    return (
      <div className="login">
        <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
        <style jsx>{`
          .login {
            max-width: 20rem;
            margin: 40px auto 0;
            padding: 1rem;
            border: 1px solid #dfe1e5;
            border-radius: 4px;
            text-align: center;
            box-shadow: 0px 0px 6px 6px #f7f7f7;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="login">
        <EmailForm disabled={disabled} />
        <style jsx>{`
          .login {
            max-width: 20rem;
            margin: 40px auto 0;
            padding: 1rem;
            border: 1px solid #dfe1e5;
            border-radius: 4px;
            text-align: center;
            box-shadow: 0px 0px 6px 6px #f7f7f7;
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
};

export default Login;
