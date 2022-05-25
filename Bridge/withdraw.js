const { use, POSClient } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});

// install web3 plugin
use(Web3ClientPlugin);
var mainRPC ="https://goerli.infura.io/v3/989463cceccb4c17b44b5b5a6068cf2a";
var childRPC="https://rpc-mumbai.maticvigil.com/v1/972750472dea9a17a28b1d867ac86c61e8b29569";

var fromAddress="0x94ace6CC3A7bb25aceab19AC7Dc2cfC69B2170c4";
var privateKey="67d50a1966cbb478b2e2da3d0e3a118e66e91814c9f56696493287faf3f4efdb";
var tokenId=11;

const executeWithdrawMumbaiToGoerliTestNet = async () => {

    const posClient = new POSClient();
    await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
            provider: new HDWalletProvider(privateKey, mainRPC),
            defaultConfig: {
                from : fromAddress
            }
        },
        child: {
            provider: new HDWalletProvider(privateKey, childRPC),
            defaultConfig: {
                from : fromAddress
            }
        }
    });
 
    const parentTokenAddress="0x7e5DEbc5d95FFB65b7d389D8c35109463d76927a";
    const childTokenAddress="0x75d008a9a50a961c47e110d8a5b3c42247eec9e6";
  
    const parentERC721Token = posClient.erc721(parentTokenAddress,true);
    const childERC721Token = posClient.erc721(childTokenAddress);

    // const resultWithdraw = await childERC721Token.withdrawStart(tokenId, {
    //     // nonce: 11793,
    //     // returnTransaction: true,
    //     gasPrice: '4000000000',
    //   });
    // const txHashWithdraw = await resultWithdraw.getTransactionHash();
    // console.log(txHashWithdraw);
    // const txReceiptWithdraw = await resultWithdraw.getReceipt();
    // console.log(txReceiptWithdraw);   
    // console.log("1st Section Done")

    const isCheckPointed = await posClient.isCheckPointed("0x344519ef59194f4f7f152c0be8d0dc4275f2626cf052e51a2bd0afd06687b54c");
    console.log(isCheckPointed);

    const resultWithdrawExit = await parentERC721Token.withdrawExit("0x344519ef59194f4f7f152c0be8d0dc4275f2626cf052e51a2bd0afd06687b54c");
    console.log("Result Withdraw Exit...")

    const txHashWithdrawExit = await resultWithdrawExit.getTransactionHash();
    console.log(txHashWithdrawExit);
    const txReceiptWithdrawExit = await resultWithdrawExit.getReceipt();
    console.log(txReceiptWithdrawExit);
}

executeWithdrawMumbaiToGoerliTestNet().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error("error", err);
    process.exit(0);
});