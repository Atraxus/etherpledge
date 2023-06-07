// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VotingToken is ERC20, Ownable {
    constructor() ERC20("VotingToken", "VOT") {}

    // Only owner can mint new tokens
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
