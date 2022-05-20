const HDWalletProvider = require("@truffle/hdwallet-provider")
const { MaticPOSClient } = require("@maticnetwork/maticjs")
const secrets = require("./secrets.json")

let nftOnweGoerliAddress = "0x7D93107852454857C511b0c1E590b59B4cE34758"
let nftReceiverMumbaiAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
let nftWithdrawFromMumbaiToGoerliAddress="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let tokenId = 9 // Token ID

// let rootToken = "0xcCE32d5A6B433972fA3Ff21233470D60ab7AFD6b" // Goerli Contract Address
// let childToken = "0xf6320326327c07759602423f01D8fad4AF9E3f24" // Mumbai Contract Address

let rootToken = "0x7e5DEbc5d95FFB65b7d389D8c35109463d76927a" // Goerli Contract Address
let childToken = "0x75d008a9a50a961c47e110d8a5b3c42247eec9e6" // Mumbai Contract Address

const parentProvider = new HDWalletProvider(secrets.seed, secrets.goerli) // Local Geth client address
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
		
		console.log("Start.....")
		/*
		let result = await maticPOSClient.burnERC721(childToken, tokenId, {
			from: nftWithdrawFromMumbaiToGoerliAddress
		});
		console.log(result)

		let burnTxHash = result.transactionHash;
		console.log(burnTxHash);
		let result_2 = await maticPOSClient.exitERC721(
			burnTxHash,
			{ 
				from: nftOnweGoerliAddress,
				gasPrice: "10000000000"
			}
		);
		console.log(result_2);
		*/
		let result = await maticPOSClient.approveERC721ForDeposit(rootToken, tokenId, {
			from: nftOnweGoerliAddress,
			gasPrice: "10000000000"
		})
		console.log("result")
		console.log(result)

		let result_2 = await maticPOSClient.depositERC721ForUser(
			rootToken,
			nftReceiverMumbaiAddress,
			tokenId.toString(),
			{ 
				from: nftOnweGoerliAddress,
				gasPrice: "10000000000"
			}
		)
		console.log("result_2")
		console.log(result_2)
		console.log("Completed Transfer NFT token Goerli TestNet to Mumbai TestNet");
	}
	catch (error)
	{
		console.log("Errors")
		console.log(error)
	}
})()