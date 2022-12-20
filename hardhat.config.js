/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const {
  ALCHEMY_GOERLI_API_URL,
  ALCHEMY_MUMBAI_API_URL,
  CRYPTO_WALLET_PRIVATE_KEY,
} = process.env;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: ALCHEMY_GOERLI_API_URL,
      accounts: [`0x${CRYPTO_WALLET_PRIVATE_KEY}`],
    },
    mumbai: {
      url: ALCHEMY_MUMBAI_API_URL,
      accounts: [`0x${CRYPTO_WALLET_PRIVATE_KEY}`],
    },
  },
};
