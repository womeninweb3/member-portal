/**
* @type import('hardhat/config').HardhatUserConfig
*/

require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.10",
  allowUnlimitedContractSize: true,
  networks: {
    mumbai: {
      url: process.env.API_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
   