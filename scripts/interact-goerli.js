const ALCHEMY_GOERLI_API_KEY = process.env.ALCHEMY_GOERLI_API_KEY;
const CRYPTO_WALLET_PRIVATE_KEY = process.env.CRYPTO_WALLET_PRIVATE_KEY;
const GOERLI_CONTRACT_ADDRESS = process.env.GOERLI_CONTRACT_ADDRESS;

// For Hardhat
const contract = require("../artifacts/contracts/WIW3CredentialToken.sol/WIW3CredentialToken.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  ALCHEMY_GOERLI_API_KEY
);

// Signer
const signer = new ethers.Wallet(CRYPTO_WALLET_PRIVATE_KEY, alchemyProvider);

// Contract
const wiw3CredentialTokenContract = new ethers.Contract(
  GOERLI_CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  // Check out the Base Token URI
  const base = await wiw3CredentialTokenContract.base();
  console.log("The Base URI is: " + base);

  // Mint the Base Credential Token ONCE
  const mintedBase = await wiw3CredentialTokenContract.mintBase(
    "0xEEb7D9d08Da3cd11C84237DC9fB355944A3d75c3"
  );
  console.log("The minted base: ", mintedBase);

  // Upgrade the current level ONCE
  const updatedLevel = await wiw3CredentialTokenContract.updateLevel(1, 0);
  console.log("Updated the level: ", updatedLevel);

  // Fetch a list of ALL Credential Tokens
  const credentialTokens =
    await wiw3CredentialTokenContract.fetchAllCredentialTokens();
  console.log("List of ALL Credential Tokens minted: " + credentialTokens);
}
main();
