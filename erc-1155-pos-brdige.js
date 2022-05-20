// main.js
const HDWalletProvider = require("@truffle/hdwallet-provider")
const { MaticPOSClient } = require("@maticnetwork/maticjs")
const secrets = require("./secrets.json")

let user = "0x7D93107852454857C511b0c1E590b59B4cE34758"
//let rootToken = "0x11C47A4F19cc52923b9C495080ADB441ADe38883" // Goerli Contract Address
let rootToken = "0xe212dFfB1A42c5380d05072Ae050896cF69eaB4f" // Goerli Contract Address
let childToken = "0x4cd9d903f91c843b5004fe82d72d67713294966e" // Mumbai Contract Address

let amount = 10 // amount of token we want to trasnfer
let tokenId = 0 // Token ID
let data = "" // Additional data

const parentProvider = new HDWalletProvider(secrets.seed, secrets.goerli) // Goerli TestNET JSONRPC URL
const maticProvider = new HDWalletProvider(secrets.seed, secrets.mumbai) // Mumbai Testnet JSONRPC URL

const maticPOSClient = new MaticPOSClient({
	network: "testnet",
	version: "mumbai",
	parentProvider,
	maticProvider
});

(async () =>
{
	try
	{
		let result = await maticPOSClient.approveERC1155ForDeposit(rootToken, {
			from: user, gasPrice: "10000000000"
		});
        console.log(result);

		let result_2 = await maticPOSClient.depositSingleERC1155ForUser(
			rootToken,
			user,
			tokenId.toString(),
			amount,
			data,
			{ from: user, gasPrice: "10000000000" }
		);
		console.log(result_2);
	}
	catch (error)
	{
		console.log(error)
	}
})()