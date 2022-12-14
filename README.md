# The WOMEN IN WEB3 Member Portal

A token-gated website for WIW3 members to go through the Venture Builder and earn credential tokens as they complete specific milestones.

## Getting Started

### Part 0: Sign up for Alchemy, Magic and Airtable

1. Sign up for an Alchemy account & create an app [here](https://www.alchemy.com/).
2. Sign up for a Magic account & create a Magic Auth app [here](https://dashboard.magic.link/signup).
3. Make sure you have access to the WOMEN IN WEB3 Member Portal Airtable, and [create a Personal Access Token](https://airtable.com/create/tokens) to access our Table.

### Part 1: Set up your crypto wallet & install the GH project

4. Make sure you have an Ethereum account set up on a crypto wallet of your choice. Don't forget to switch your wallet to the `Goerli Test Network`.
5. Add ether or matic from a Faucet: [Goerli Faucet](https://goerlifaucet.com/) or [Mumbai Faucet](https://mumbaifaucet.com/)
6. Run `git clone git@github.com:womeninweb3/member-portal.git` and make sure to log in using your SSH key.
7. Install dependencies using `npm install` or `yarn install`.

### Part 3: Configure .env

First, run: `mv .env.example .env`. Then, enter the keys appropriately:

```
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY="pk_live_xxx"
MAGIC_SECRET_KEY="sk_live_xxx"

CRYPTO_WALLET_PRIVATE_KEY="your-crypto-wallet's-private-key"

ALCHEMY_GOERLI_API_URL="https://eth-goerli.g.alchemy.com/v2/your-goerli-api-key-from-alchemy"
ALCHEMY_GOERLI_API_KEY= "<your-alchemy-goerli-app's-api-key>"

ALCHEMY_MUMBAI_API_URL="https://polygon-mumbai.g.alchemy.com/v2/your-api-key-from-alchemy"
ALCHEMY_MUMBAI_API_KEY="<your-mumbai-api-key-from-alchemy>"

NEXT_PUBLIC_GOERLI_CONTRACT_ADDRESS="0x<your Goerli contract address>"
NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS="0x<your Mumbai contract address>"

NEXT_PUBLIC_AIRTABLE_API_KEY="your-personal-access-token-to-airtable"
NEXT_PUBLIC_AIRTABLE_BASE_ID="the-airtable-base-id"
NEXT_PUBLIC_AIRTABLE_TABLE_ID="the-airtable-table-id"
```

**Notes:**

- You'll get your contract address once you deploy. Learn how to deploy in Part 3 ????.
- The Airtable personal access token will be moved to server side before pushing to production.

### Part 4 - GOERLI: Compile, Deploy & Interact with Smart Contract

1. Compile: `npx hardhat compile`
2. Deploy to Goerli: `npx hardhat run scripts/deploy.js --network goerli`
3. Copy the address the contract was deployed to, and paste it in your .env
4. Interact: `npx hardhat run scripts/interact-goerli.js`

### Part 4 - MUMBAI: Compile, Deploy & Interact with Smart Contract

1. Compile: `npx hardhat compile`
2. Deploy to Mumbai: `npx hardhat run scripts/deploy.js --network mumbai`
3. Copy the address the contract was deployed to, and paste it in your .env
4. Interact: `npx hardhat run scripts/interact-mumbai.js`

### Part 5: Run the Client

With `npm run dev`.
