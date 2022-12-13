// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Enable logging when running contract & test
import "hardhat/console.sol";

// Defines a contract named `CredentialToken`
contract WIW3CredentialToken is ERC721, ERC721URIStorage, Ownable {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIdCounter;

	// Individual Credential Token Data:
	struct CredentialToken {
		uint256 id;
		uint256 currentLevel;
		string credentialTokenURI;
		string cohort;
	}

	/* 💡 Mappings:
	 * Incredibly useful for associations, and frequently used
	 * to associate unique Ethereum addresses with associated
	 * value types.
	 */

	/* 💡 Token ID:
	 * The unique identifier code for an NFT. It's a key data
	 * point used to distinguish one NFT from another.
	 */

	/* 🤔 Do we want these mappings to be publicly accessible? */

	// Map a tokenID to a credential token.
	mapping(uint256 => CredentialToken) public credentialTokens;

	// Map a user's address to corresponding credential
	// tokens that they own.
	mapping(address => uint256[]) ownedCredentialTokens;

	/* 💡 Constructor:
	 * Similar to many class-based object-oriented languages,
	 * a constructor is a special function that is only executed
	 * upon contract creation. Constructors are used to
	 * initialize the contract's data.
	 */

	string public base;
	string public learn;
	string public prototype;
	string public venture;

	/* 🤔 How come we don't specify an owner of the credential token? */

	// Upon contract creation, set all Token URIs
	constructor() ERC721("WOMEN IN WEB3 Credential Tokens", "CT") {
		base = "https://ipfs.io/ipfs/QmVk3LQxKt8kpJNn8XKaa6DUQ7ztHmvHXusuJuypqVSV5W?filename=base.json" ;
        learn = "https://ipfs.io/ipfs/QmXuBH1sBZobCbk7aenKv7dowbQi4Z8C1vCrLHgm2Jt7HL?filename=learn.json";
        prototype = "https://ipfs.io/ipfs/Qmai2qmzqHGzuS5sYfYca5v5uPSBp6sAMm839Wt5tki7j4?filename=prototype.json";
        venture = "https://ipfs.io/ipfs/QmTkjbbmrHz4AhGaPky9HcJYE6L5g5YwDESCUy3tV3eRr5?filename=venture.json";
	}

	/* 💡 Smart Contract Events:
	 * A way for your contract to communicate
	 * that something happened on the blockchain to your app front-end,
	 * which can be 'listening' for certain events and take action when
	 * they happen.
	 */

	// Emitted when updateLevel function is called
	event CredentialTokenUpdated(uint256 tokenId, uint256 level);
	// Emitted when Attest function is called
	event Attest(address indexed to, uint256 indexed tokenId);
	// Emitted when Revoke function is called
	event Revoke(address indexed to, uint256 indexed tokenId);

	// Supports minting of the Credential Token's base NFT
	function setDefaultURI(uint256 tokenId) internal {
		// Default to the base Garden Bed:
		string memory defaultUri = base;
		_setTokenURI(tokenId, defaultUri);

		// Create the Credential Token:
		CredentialToken memory credentialToken;
		credentialToken.id = tokenId; // tokenId is # of the NFT that's been minted

		/* 💡 Levels:
		 * 0: Garden Bed
		 * 1: Learn
		 * 2: Prototype
		 * 3: Venture
		 */
		credentialToken.currentLevel = 0;
		credentialToken.credentialTokenURI = base;
		credentialToken.cohort = "Metaverse";

		// Update Credential Tokens:
		credentialTokens[tokenId] = credentialToken;
	}

	// Allows *only* us/WOMEN IN WEB3 Founding Team to mint
	// the BASE of credential token
	function mintBase(address to) public onlyOwner {
		// Value of the minted Credential Token's Token ID
		// will be the tokenIdCounter's current value.
		uint256 tokenId = _tokenIdCounter.current();

		// Increment the tokenIdCounter
		_tokenIdCounter.increment();

		// Mint base of the credential token
		_safeMint(to, tokenId);

		// Set Base URI & level to Garden Bed, & the cohort:
		setDefaultURI(tokenId);

		console.log(
			"Done! Here is the minted Credential Token: ",
			tokenId
		);
	}

	/* 🤔 Functions we need:
	 * `currentLevel`: returns a specific user's associated level in Venture Builder
	 * `fetchOwnedCredentialTokens`: returns list of credential tokens a member owns
	 */

	/* Returns all credential tokens minted */
	function fetchAllCredentialTokens()
		public
		view
		returns (CredentialToken[] memory)
	{
		uint256 tokenCount = _tokenIdCounter.current();
		uint256 currentIndex = 0;

		CredentialToken[] memory tokens = new CredentialToken[](
			tokenCount
		);
		for (uint256 i = 0; i < tokenCount; i++) {
			uint256 currentId = i + 1;
			CredentialToken memory currentToken = credentialTokens[
				currentId
			];
			tokens[currentIndex] = currentToken;
			currentIndex += 1;
		}
		return tokens;
	}

	// Allows us/Founding Team of WOMEN IN WEB3 to
	// update each member's level. That is - after
	// we've reviewed the member's Proof of Work.

	// Updates Token URIs based on the current level
	/* 🚨 CHANGED FROM INTERNAL TO PUBLIC FOR TESTING PURPOSES ONLY */
	function updateLevel(uint256 tokenId, uint256 currentLevel) public {
		/* 🤔 We may need to use storage instead of memory.
	   Memory = makes a copy of struct in memory & updates
	   that. Storage = get a reference to struct in storage,
	   so our modifications will persist. */

		// Get Credential Token:
		CredentialToken memory credentialToken = credentialTokens[
			tokenId
		];

		// Update from Base (0) to Level (1): Learn
		if (currentLevel == 0) {
			// Test:
			console.log(
				"Updating Token URI with ",
				"Learn",
				currentLevel
			);

			// Set the token URI:
			_setTokenURI(credentialToken.id, learn);

			// Update current level & Token URI:
			credentialToken.currentLevel = 1;
			credentialToken.credentialTokenURI = learn;
		}

		// Update from Level (1): Learn to Level (2): Prototype
		if (currentLevel == 1) {
			// Testing:
			console.log(
				"Updating Token URI with ",
				"Prototype",
				currentLevel
			);

			// Setting the token URI:
			_setTokenURI(credentialToken.id, prototype);

			// Updating the current level & token URI:
			credentialToken.currentLevel = 2;
			credentialToken.credentialTokenURI = prototype;
		}

		// Update from Level (2): Prototype to Level (3): Venture
		if (currentLevel == 2) {
			// Testing:
			console.log(
				"Updating Token URI with ",
				"Venture",
				currentLevel
			);

			// Setting the token URI:
			_setTokenURI(credentialToken.id, venture);

			// Updating the current level & token URI:
			credentialToken.currentLevel = 3;
			credentialToken.credentialTokenURI = venture;
		}

		emit CredentialTokenUpdated(credentialToken.id, currentLevel);
	}

	// The following functions are overrides required by Solidity.

	/* 💡 Non-transferrable Token:
	 * Every time this code will run, the require statement will check:
	 * if the from address parameter in the function is set to zero.
	 * If yes, it will allow the action to happen and block all the other
	 * transfers to make it a non-transferable token.
	 * Note: When address == 0, it means token's being issued/minted, not transferred.
	 */

	// If user wants to burn their credential token & give it back.
	function burn(uint256 tokenId) external {
		require(
			ownerOf(tokenId) == msg.sender,
			"Only owner of the token can burn it"
		);
		_burn(tokenId);
	}

	// If issuer AKA WOMEN IN WEB3 wants to take the credential token back.
	function revoke(uint256 tokenId) external onlyOwner {
		_burn(tokenId);
	}

	// The ONLY functions user can do is BURNING or RECEIVING the token
	// from @address(0) = token is being issued
	// from @to(0) = token is being burned
	function _beforeTokenTransfer(
		address from,
		address to
	) internal virtual {
		require(
			from == address(0) || to == address(0),
			"You cannot transfer this token."
		);
	}

	function _afterTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal virtual {
		if (from == address(0)) {
			emit Attest(to, tokenId);
		} else if (to == address(0)) {
			emit Revoke(to, tokenId);
		}
	}

	// The following functions are overrides required by Solidity.

	function _burn(
		uint256 tokenId
	) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(
		uint256 tokenId
	)
		public
		view
		override(ERC721, ERC721URIStorage)
		returns (string memory)
	{
		return super.tokenURI(tokenId);
	}
}
