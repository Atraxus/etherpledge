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
        let data = { campaigns: [] };

        // Add deployed contract address and ABI to data
        let deadline = new Date();
        deadline.setTime(deadline.getTime() + _duration * 1000);
        data.campaigns.push({
          projectName: "Etherpledge Campaign",
          projectInfo: "Join our week-long campaign for EtherPledge, your trusted decentralized platform. Your pledges are more than donations; they empower you to vote on potential new features for our site. Your support can help shape EtherPledge's future!",
          author: "Etherpledge Team",
          authorInfo: "Our diverse team at EtherPledge is passionate about using blockchain technology to enhance crowdfunding. United by the goal of transparency and accessibility, we value collaboration, continuous learning, and our supportive community.",
          address: Campaign.networks[deployer.network_id].address,
          abi: Campaign.abi,
          goal: _goal,
          end: deadline,
          descriptions: _descriptions,
        });

        // Write back to file
        fs.writeFileSync('backend/db.json', JSON.stringify(data, null, 2));
      }
    });
};
