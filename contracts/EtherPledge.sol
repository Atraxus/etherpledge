// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingToken.sol";

contract Campaign {
    VotingToken public token;
    uint256 public goal;
    uint256 public end;
    uint256 public constant tokenPerWei = 10;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public votes;

    constructor(VotingToken _token, uint256 _goal, uint256 _duration) {
        token = _token;
        goal = _goal;
        end = block.timestamp + _duration;
    }

    function pledge() external payable {
        require(block.timestamp <= end, "Crowdfunding period has ended");
        uint256 tokensToMint = msg.value * tokenPerWei;
        token.mint(msg.sender, tokensToMint);
        balances[msg.sender] += msg.value;
    }

    function vote(uint256 tokens, address feature) external {
        require(tokens <= token.balanceOf(msg.sender), "Not enough tokens");
        token.transferFrom(msg.sender, address(this), tokens);
        votes[feature] += tokens;
    }

}
