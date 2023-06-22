<template>
  <div>
    <h2>Crowdfunding Campaign</h2>
    <p>Goal Amount: {{ goal }} ETH</p>
    <p>Time Remaining: {{ timeRemaining }} seconds</p>

    <h3>Contribute ETH</h3>
    <input
      type="number"
      v-model="contribution"
      placeholder="Contribution Amount (ETH)"
    />
    <button @click="pledge">Contribute</button>

    <h3>Contributor List</h3>
    <ul>
      <li v-for="(balance, address) in balances" :key="address">
        {{ address }}: {{ balance }} ETH
      </li>
    </ul>
  </div>
</template>

<script>
import Web3 from "web3";
import CampaignContract from "../../build/contracts/Campaign.json";
import bigInt from "big-integer";

export default {
  data() {
    return {
      web3: null,
      contract: null,
      goal: null,
      end: null,
      timeRemaining: 0,
      contribution: 0,
      balances: {},
    };
  },

  mounted() {
    this.initializeWeb3().then(() => {
      if (this.contract !== null) {
        this.loadContractDetails();
        this.loadBalances();
      }
      setInterval(this.updateTimeRemaining, 1000);
    });
  },
  methods: {
    async initializeWeb3() {
      try {
        if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          this.web3 = new Web3(window.ethereum);
        } else {
          console.error(
            "Please install the MetaMask plugin and connect to the Ethereum network."
          );
        }

        const contractAddress = "0xC504bFc8b8f8E903F9f6A5C098A811c4E6E5a446";
        this.contract = new this.web3.eth.Contract(
          CampaignContract.abi,
          contractAddress
        );

        const privateKey =
          "0x1de42d51fd420f56ab7b61b6a02ab5a00a33037b5479007cedba0eb72dbb29fb"; // Ganache account private key
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        this.web3.eth.defaultAccount = account.address;
        this.web3.eth.accounts.wallet.add(account);

        console.log("add", account.address);
        console.log("Contract:", this.contract);
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
      }
    },

    async loadContractDetails() {
      this.goal = await this.contract.methods.goal().call();
      this.end = await this.contract.methods.end().call();
    },

    async updateTimeRemaining() {
      const currentTime = bigInt(Math.floor(Date.now() / 1000));
      const end = bigInt(this.end);
      this.timeRemaining = Number(bigInt.max(bigInt(0), end - currentTime));
    },

    async pledge() {
      const weiAmount = this.web3.utils.toWei(
        this.contribution.toString(),
        "ether"
      );

      try {
        await this.contract.methods.pledge().send({
          from: this.web3.eth.defaultAccount,
          value: weiAmount,
        });

        this.contribution = 0;
        await this.loadBalances();
      } catch (error) {
        console.error(error);
      }
    },

    async loadBalances() {
      const accounts = await this.web3.eth.getAccounts();
      const balances = {};

      for (let i = 0; i < accounts.length; i++) {
        const address = accounts[i];
        const balance = await this.contract.methods.balances(address).call();
        balances[address] = this.web3.utils.fromWei(balance, "ether");
      }

      this.balances = balances;
    },
  },
};
</script>