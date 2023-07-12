const Campaign = artifacts.require("Campaign");

module.exports = function (deployer, network, accounts) {
  // Define your parameters for Campaign constructor
  const _goal = web3.utils.toWei('10', 'ether');
  const _duration = 60 * 60 * 24; // 1 day in seconds
  const _descriptions = [
    "This is the first description",
    "This is the second description",
    "This is the third description"
  ];

  // Pass the parameters to the deploy function of Campaign
  deployer.deploy(Campaign, _goal, _duration, _descriptions)
    .then(() => {
      if (Campaign.networks[deployer.network_id]) {
        console.log("Campaign Contract deployed at address:", Campaign.networks[deployer.network_id].address);
        console.log("Campaign Contract ABI:", JSON.stringify(Campaign.abi));
      }
    });
};