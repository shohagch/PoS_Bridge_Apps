const HDWalletProvider = require("@truffle/hdwallet-provider")
const { MaticPOSClient } = require("@maticnetwork/maticjs")
const secrets = require("./secrets.json")

let user = "0x7D93107852454857C511b0c1E590b59B4cE34758"
// let rootToken = "0xcCE32d5A6B433972fA3Ff21233470D60ab7AFD6b" // Goerli Contract Address
// let childToken = "0xf6320326327c07759602423f01D8fad4AF9E3f24" // Mumbai Contract Address

let rootToken = "0x7e5DEbc5d95FFB65b7d389D8c35109463d76927a" // Goerli Contract Address
let childToken = "0xca183b42F4109294D00a286551deca1a18c5Fc03" // Mumbai Contract Address
let tokenId = 6 // Token ID

const parentProvider = new HDWalletProvider(secrets.seed, secrets.goerli) // // Local Geth client address
const maticProvider = new HDWalletProvider(secrets.seed, secrets.mumbai) // DataHub Mumbai Testnet JSONRPC URL

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
		// let result = await maticPOSClient.burnERC721(childToken, tokenId, {
		// 	from: user
		// })
		// console.log(result)
		// let burnTxHash = "0x09400584a1eabdf85fc491bbbfbc9d5283905478e76fd6a5d7d22bb63e0510fa" // result.transactionHash
		// let result_2 = await maticPOSClient.exitERC721(
		// 	burnTxHash,
		// 	{ from: user,
		// 		encodeAbi: true,
		// 		gasPrice: "10000000000"
		// 	}
		// )
		// console.log(result_2)

		let result = await maticPOSClient.approveERC721ForDeposit(rootToken, tokenId, {
			from: user,
			gasPrice: "10000000000"
		})
		console.log("result")
		console.log(result)

		let result_2 = await maticPOSClient.depositERC721ForUser(
			rootToken,
			user,
			tokenId.toString(),
			{ 
				from: user,
				gasPrice: "10000000000"
			}
		)
		console.log("result_2")
		console.log(result_2)
	}
	catch (error)
	{
		console.log("Errors")
		console.log(error)
	}
})()