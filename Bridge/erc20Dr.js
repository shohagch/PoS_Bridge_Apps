const { use, POSClient } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var web3 = require('web3');

const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});

// install web3 plugin
use(Web3ClientPlugin);
var fromAddress="0x8d604f20f146fcef665b1A97A46e7BDc10295cb3";
var privateKey="0c77f3e4f9fb6aaf662b38195a8176f0752ab02dbfd02db0126f413929e47932";
var amount= web3.utils.toWei('100', 'ether');
console.log(amount);

var mainRPC ="https://goerli.infura.io/v3/989463cceccb4c17b44b5b5a6068cf2a";
var childRPC="https://rpc-mumbai.maticvigil.com/v1/972750472dea9a17a28b1d867ac86c61e8b29569";

const executeDepositMumbaiToGoerliTestNet = async () => {
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
    const parentTokenAddress="0xb6c5c98337ddc9906cd80fc7b69045f3e93004e5";
    const childTokenAddress="0x6acb9f0f64bc39c41fed4fce510a7712f94c7d09";
    const parentERC20Token = posClient.erc20(parentTokenAddress,true);
    const childERC20Token = posClient.erc20(childTokenAddress);

    console.log("Start...");
    // start withdraw process for 100 amount
    // const result = await childERC20Token.withdrawStart(amount);
    // const txHash = await result.getTransactionHash();
    // console.log(txHash);
    // const txReceipt = await result.getReceipt();
    // console.log(txReceipt);

    const isCheckPointed = await posClient.isCheckPointed("0x8d548de14a435c5f25802ebce7f74cf17c8ca00a24262e8a5a96786332ae53fc");
    console.log(isCheckPointed);

    // const resultExit = await parentERC20Token.withdrawExit(txHash);
    // const txHashExit = await resultExit.getTransactionHash();
    // console.log(txHashExit);
    // const txReceiptExit = await result.getReceipt();
    // console.log(txReceiptExit);

    console.log("Process End...");
}

executeDepositMumbaiToGoerliTestNet().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error("error", err);
    process.exit(0);
});
