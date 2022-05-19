// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC1155NFT is ERC1155, Ownable {
    uint256 public constant MLBFun = 0;
    uint256 public constant MLBNFun = 1;

  uint256[] tokens = [2, 3, 4, 5];     
    constructor(uint256 MLBFunIS) ERC1155("") {
        _mint(msg.sender, MLBFun, MLBFunIS * (10 **18), "");
        _mint(msg.sender, MLBNFun, 1, "");
        _mintBatch(0x94ace6CC3A7bb25aceab19AC7Dc2cfC69B2170c4, tokens, tokens,"");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}