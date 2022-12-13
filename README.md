# The WOMEN IN WEB3 Member Portal
A token-gated website for WIW3 members to go through the Venture Builder and earn credential tokens as they complete specific milestones.

## Getting Started

### Part 1: Alchemy, Crypto Wallet & Install
1. Sign up for an Alchemy account & create an app [here](https://www.alchemy.com/).
2. Make sure you have an Ethereum account set up on a crypto wallet of your choice. Don't forget to switch your wallet to the `Goerli Test Network`.
3. Add ether from a Faucet. You can go to [Goerli faucet](https://goerlifaucet.com/) to get some from Alchemy!
4. Run `git clone git@github.com:womeninweb3/member-portal.git` and make sure to log in using your SSH key.
5. Install dependencies using `npm install` or `yarn install`.

### Part 2: Configure .env
```
API_URL = "https://eth-goerli.g.alchemy.com/v2/your-api-key-from-alchemy"
PRIVATE_KEY = "your-crypto-wallet's-private-key"
API_KEY = "<your-alchemy-app's-api-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

**Note:** You'll get your contract address once you deploy. Learn how to deploy in Part 3 👇.

### Part 3: Compile, Deploy & Interact with Smart Contract
1. Compile: `npx hardhat compile`
2. Deploy: `npx hardhat run scripts/deploy.js --network goerli`
3. Copy the address the contract was deployed to, and paste it in your .env
4. Interact: `npx hardhat run scripts/interact.js`
