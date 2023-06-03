pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT
contract Voting {
    struct Option {
        string name;
        uint256 voteCount;
    }

    Option[] public options;
    mapping(address => bool) public hasVoted;

    function createOption(string memory _name) public {
        options.push(Option(_name, 0));
    }

    function vote(uint256 _optionIndex) public {
        require(_optionIndex < options.length, "Invalid option");
        require(!hasVoted[msg.sender], "Already voted");

        options[_optionIndex].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getOptionCount() public view returns (uint256) {
        return options.length;
    }

    function getOption(uint256 _optionIndex) public view returns (string memory, uint256) {
        require(_optionIndex < options.length, "Invalid option");

        Option memory option = options[_optionIndex];
        return (option.name, option.voteCount);
    }
}
