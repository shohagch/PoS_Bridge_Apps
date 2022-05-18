var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

async function withdraw_token() {
    
    const privateKey = 'd043b90f5073f4f3768a86a51fee6ddd1a1df7b395712421b2c66da0834b574a';
    const from = "0x7D93107852454857C511b0c1E590b59B4cE34758";
    const rootToken = "0x655F2166b0709cd575202630952D71E2bB0d61Af"; // this is taken from matic docs and discussed below
    const chaildToken="0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1";

    //The following RPC urls will change for mainnet.
    const parentProvider = new HDWalletProvider(privateKey, "https://goerli.infura.io/v3/5b7d157e385946e9a4eb12d96e02b7e5");
    const maticProvider = new HDWalletProvider(privateKey, 'https://rpc-mumbai.maticvigil.com/v1/972750472dea9a17a28b1d867ac86c61e8b29569');
    
    //test ERC20 token address parent goerli - 0x655F2166b0709cd575202630952D71E2bB0d61Af
    //test ERC20 token address child mumbai - 0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1
   // Above addresses are taken from matic docs and discussed below
    
    // // for mumbai testnet
    const maticPOSClient = new MaticPOSClient({
        network: "testnet",
        version: "mumbai",
        parentProvider: parentProvider,
        maticProvider: maticProvider
    });
    
    // //for mainnet
    // const maticPOSClient = new MaticPOSClient({
    //    network: "mainnet",
    //    version: "v1",
    //    parentProvider: parentProvider,
    //    maticProvider: maticProvider
    // });
    console.log("Withdraw initiated!");

    var amount = Web3.utils.toWei('0.1', 'ether');
    console.log('Burning . . .');

    var proof = await maticPOSClient.burnERC20(chaildToken, amount, { from: from });
    console.log('Hash generated');

    await maticPOSClient.exitERC20(proof.transactionHash, { from: from }).catch((err) => {
        console.log(err)
    });

    console.log('Withdraw completed');
}

withdraw_token();