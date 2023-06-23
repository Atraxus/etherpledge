pragma solidity ^0.8.0;

import "./VotingToken.sol";

contract Campaign is Ownable {
    // ------------------ VARIABLES ------------------

    VotingToken public token;
    uint256 public goal;
    uint256 public end;
    uint256 public constant tokenPerWei = 10;
    bool public isCampaignOpen = true;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public votes;
    address[] public features;

    // ------------------ EVENTS ------------------

    // Event emitted when a feature is added during construction of the contract.
    // This should be received by the frontend to display the feature and its description.
    event FeatureAdded(address indexed featureAddress, string description);
    // Event emitted when a user pledges ETH to the contract.
    // This should be received by the frontend to link it with the user account.
    event Pledged(
        address indexed pledger,
        uint256 amount,
        uint256 tokensMinted
    );
    // Event emitted when a user votes for a feature. This should be received by the
    // frontend to link it with the campaign.
    event Voted(address indexed voter, uint256 tokens, address feature);

    // ------------------ FUNCTIONS ------------------

    // Constructor takes in the token for voting, the funding goal, the duration of the campaign, and the features to vote on.
    constructor(
        VotingToken _token,
        uint256 _goal,
        uint256 _duration,
        address[] memory _features,
        string[] memory _descriptions
    ) {
        require(
            _features.length == _descriptions.length,
            "Features and descriptions should have same length"
        );
        token = _token;
        goal = _goal;
        end = block.timestamp + _duration;
        features = _features;
        for (uint256 i = 0; i < _features.length; i++) {
            emit FeatureAdded(_features[i], _descriptions[i]);
        }
    }

    // Modify the pledge function to emit the event
    function pledge() external payable {
        require(isCampaignOpen, "Campaign has ended");
        require(block.timestamp <= end, "Crowdfunding period has ended");
        uint256 tokensToMint = msg.value * tokenPerWei;
        token.mint(msg.sender, tokensToMint);
        balances[msg.sender] += msg.value;

        // Check if the campaign has reached its goal
        if (address(this).balance >= goal) {
            isCampaignOpen = false;
        }

        // Emit the event after the state changes
        emit Pledged(msg.sender, msg.value, tokensToMint);
    }

    // Modify the vote function to emit the event
    function vote(uint256 tokens, address feature) external {
        require(tokens <= token.balanceOf(msg.sender), "Not enough tokens");
        require(isValidFeature(feature), "Invalid feature");
        token.transferFrom(msg.sender, address(this), tokens);
        votes[feature] += tokens;

        // Emit the event after the state changes
        emit Voted(msg.sender, tokens, feature);
    }

    // Check if the given feature is valid
    function isValidFeature(address feature) public view returns (bool) {
        for (uint i = 0; i < features.length; i++) {
            if (features[i] == feature) {
                return true;
            }
        }
        return false;
    }

    // Add a function for the owner to collect all the funds once the campaign is successful
    function collectFunds() external onlyOwner {
        require(block.timestamp > end, "Crowdfunding period has not ended");
        require(address(this).balance >= goal, "Campaign was not successful");

        // Transfer all funds to the owner
        payable(owner()).transfer(address(this).balance);
    }

    // Withdraw ETH from the contract if the campaign failed
    function withdraw() external {
        require(block.timestamp > end, "Crowdfunding period has not ended");
        require(address(this).balance < goal, "Campaign was successful");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
