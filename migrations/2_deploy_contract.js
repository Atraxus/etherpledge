const Campaign = artifacts.require("Campaign");
const fs = require('fs');

module.exports = function (deployer, network, accounts) {
  // Define your parameters for Campaign constructor
  const _goal = web3.utils.toWei('10', 'ether');
  const _duration = 7 * 60 * 60 * 24; // 1 week in seconds
  const _descriptions = [
    "Add quorum to decide, when a campaign is successful.",
    "Let multiple people create a campaign together.",
    "Redesign of the web-interface.",
  ];

  // Pass the parameters to the deploy function of Campaign
  deployer.deploy(Campaign, _goal, _duration, _descriptions)
    .then(() => {
      if (Campaign.networks[deployer.network_id]) {
        console.log("Campaign Contract deployed at address:", Campaign.networks[deployer.network_id].address);
        console.log("Campaign Contract ABI:", JSON.stringify(Campaign.abi));

        // Read the existing JSON file
        let data;
        try {
          data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
        } catch (e) {
          data = { campaigns: [] };
        }

        // Add deployed contract address and ABI to data
        data.campaigns.push({
          address: Campaign.networks[deployer.network_id].address
        });

        // Write back to file
        fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
      }
    });
};
