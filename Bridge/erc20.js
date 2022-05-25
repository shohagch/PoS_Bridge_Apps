const { use, POSClient } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var web3   = require('web3');

const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
    path: path.join(__dirname, '.env')
});

// install web3 plugin
use(Web3ClientPlugin);

var fromAddress="0x7D93107852454857C511b0c1E590b59B4cE34758";
var privateKey="d043b90f5073f4f3768a86a51fee6ddd1a1df7b395712421b2c66da0834b574a";
var reciverAddress="0x7D93107852454857C511b0c1E590b59B4cE34758";
//var amount= web3.utils.toWei('100', 'ether');
var amount=1*Math.pow(10, 16);
console.log(amount);

var mainRPC ="https://goerli.infura.io/v3/989463cceccb4c17b44b5b5a6068cf2a";
var childRPC="https://rpc-mumbai.maticvigil.com/v1/972750472dea9a17a28b1d867ac86c61e8b29569";

const executeDepositGoerliToMumbaiTestNet = async () => {
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

    console.log("Start...")
    const approveResult = await parentERC20Token.approve(amount);
    const txHash = await approveResult.getTransactionHash();
    console.log(txHash);
    const txReceipt = await approveResult.getReceipt();
    console.log(txReceipt);

    const result = await parentERC20Token.deposit(amount, reciverAddress);
    const txHashDeposit = await result.getTransactionHash();
    console.log(txHashDeposit);
    const txReceiptDeposit = await result.getReceipt();
    console.log(txReceiptDeposit);
    console.log("End Executing Process...")
}

executeDepositGoerliToMumbaiTestNet().then(_ => {
    process.exit(0)
}).catch(err => {
    console.error("error", err);
    process.exit(0);
});