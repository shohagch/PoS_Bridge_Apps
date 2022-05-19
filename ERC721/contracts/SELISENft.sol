// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SELISENft is ERC721, Ownable {
    constructor() ERC721("SELISENft", "SNFT") {
        super._mint(msg.sender, 6);
        super._mint(msg.sender, 7);
        super._mint(msg.sender, 8);
        super._mint(msg.sender, 9);

        super._mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 1);
        super._mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 2);
        super._mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 3);
        super._mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 4);
        super._mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 5);

        super._mint(0x94ace6CC3A7bb25aceab19AC7Dc2cfC69B2170c4, 10);
        super._mint(0x94ace6CC3A7bb25aceab19AC7Dc2cfC69B2170c4, 11);
        super._mint(0x94ace6CC3A7bb25aceab19AC7Dc2cfC69B2170c4, 12);
        super._mint(0x94ace6CC3A7bb25aceab19AC7Dc2cfC69B2170c4, 13);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://siasky.net/EABmgOTKUkcmmxYebuLZKQYUw6rygnC0SDLJ84pVCEnn_A";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
