async function main() {
   const WIW3CredentialToken = await ethers.getContractFactory("WIW3CredentialToken");

   // Start deployment, returning a promise that resolves to a contract object
   const wiw3_credential_token = await WIW3CredentialToken.deploy();   
   console.log("Contract deployed to address:", wiw3_credential_token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
