const Migrations = artifacts.require("ERC1155NFT");

module.exports = function (deployer) {
  deployer.deploy(Migrations, 10);
};
