const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Voting)
    .then(() => {
      if (Voting.networks[deployer.network_id]) {
        console.log("Contract deployed at address:", Voting.networks[deployer.network_id].address);
        console.log("Contract ABI:", JSON.stringify(Voting.abi));
      }
    });
};
