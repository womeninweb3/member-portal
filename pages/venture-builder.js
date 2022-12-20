import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import Loading from "../components/loading";
import Link from "next/link";

// Initialize the Magic x Ethers Provider
import { Magic } from "magic-sdk";
import { ethers } from "ethers";

const contractJSON = require("../artifacts/contracts/WIW3CredentialToken.sol/WIW3CredentialToken.json");
const NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS;

const VentureBuilder = () => {
  const [user] = useContext(UserContext);

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

    const maticEthersProvider = new ethers.providers.Web3Provider(
      magicMatic.rpcProvider
    );

    // Get the Magic-authenticated signer
    const signer = maticEthersProvider.getSigner();
    console.log("Magic Authenticated Signer: ", signer);

    // Access Smart Contract deployed on Mumbai
    const contract = new ethers.Contract(
      NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS,
      contractJSON.abi,
      signer
    );

    // Interact with Smart Contract deployed on Mumbai
    const logCredentialTokens = async () => {
      const credentialTokens = await contract.fetchAllCredentialTokens();
      console.log("List of ALL Credential Tokens minted: " + credentialTokens);
    };
    logCredentialTokens();

    return (
      <>
        {user?.loading ? (
          <Loading />
        ) : (
          user?.issuer && (
            <div>
              <h1>Venture Builder</h1>
              <h2>
                <Link href="/learn">Level 1: Learn</Link>
              </h2>
              <h2>
                <Link href="/prototype">Level 2: Prototype</Link>
              </h2>
              <h2>
                <Link href="/venture">Level 3: Venture</Link>
              </h2>
            </div>
          )
        )}
      </>
    );
  } else {
    console.log("Waiting...");
  }
};

export default VentureBuilder;
