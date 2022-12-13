// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

	const WIW3CredentialToken = await hre.ethers.getContractFactory("WIW3CredentialToken");

	// Start deployment, returning a promise that resolves to a contract object:
	const wiw3_credential_token = await WIW3CredentialToken.deploy();   
	console.log("Contract deployed to address:", wiw3_credential_token.address);

	// Mint the Base Credential Token ONCE:
	const mintedBase = await wiw3_credential_token.mintBase(
		"0x00e72CBCDF365395f23CeD4404C96A58d27cEd0f");
	console.log("The minted base: ", mintedBase.hash);

	// Upgrade the current level ONCE:
	const updatedLevel = await wiw3_credential_token.updateLevel(
		0,
		1
	);
	console.log("Updated the level: ", updatedLevel);

	// Fetch a list of ALL Credential Tokens:
	const credentialTokens =
		await wiw3_credential_token.fetchAllCredentialTokens();
	console.log(
		"List of ALL Credential Tokens minted: " + credentialTokens
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
