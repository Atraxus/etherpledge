<template>
  <div>
    <h2>Crowdfunding Campaign</h2>
    <p>Goal Amount: {{ goal }} ETH</p>
    <p>Time Remaining: {{ timeRemaining }} seconds</p>

    <h3>Contribute ETH</h3>
    <input type="number" v-model="contribution" placeholder="Contribution Amount (ETH)" />
    <button @click="pledge" :disabled="!isWeb3Initialized">Contribute</button>

    <h3>Contributor List</h3>
    <ul>
      <li v-for="(balance, address) in balances" :key="address">
        {{ address }}: {{ balance }} ETH
      </li>
    </ul>
  </div>
</template>

<script>
import Web3 from 'web3';
import CampaignContract from '../../build/contracts/Campaign.json';
import VotingTokenContract from '../../build/contracts/VotingToken.json';
import bigInt from 'big-integer';

export default {
  data() {
    return {
      web3: null,
      campaignContract: null,
      votingTokenContract: null,
      goal: null,
      end: null,
      timeRemaining: 0,
      contribution: 0,
      balances: {},
      isWeb3Initialized: false,
    };
  },
  mounted() {
    this.initializeWeb3().then(() => {
      if (this.campaignContract !== null) {
        this.loadContractDetails();
        this.loadBalances();
      }
      setInterval(this.updateTimeRemaining, 1000);
    });
  },
  methods: {
    async initializeWeb3() {
      try {
        if (typeof window.ethereum !== 'undefined') {
          this.web3 = new Web3(window.ethereum);

          // 等待用户登录和选择账户
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // 设置默认账户
          const accounts = await this.web3.eth.getAccounts();
          if (accounts.length === 0) {
            console.error('Please log in and select an account in MetaMask.');
            return;
          }
          this.web3.eth.defaultAccount = accounts[0];

          // 监听账户变化事件，更新默认账户
          window.ethereum.on('accountsChanged', (newAccounts) => {
            this.web3.eth.defaultAccount = newAccounts[0];
          });

          this.isWeb3Initialized = true;
        } else {
          console.error('Please install the MetaMask plugin and connect to the Ethereum network.');
        }

        const campaignContractAddress = '0xD545927fC4691E5A25B3e4e19465638E262819c3';
        this.campaignContract = new this.web3.eth.Contract(CampaignContract.abi, campaignContractAddress);

        const votingTokenContractAddress = '0x878baf3eaD75dD382eB24F3d26c1E132c14c5048';
        this.votingTokenContract = new this.web3.eth.Contract(VotingTokenContract.abi, votingTokenContractAddress);

        console.log('Campaign Contract:', this.campaignContract);
        console.log('Voting Token Contract:', this.votingTokenContract);
      } catch (error) {
        console.error('Failed to initialize Web3:', error);
      }
    },
    async loadContractDetails() {
      this.goal = await this.campaignContract.methods.goal().call();
      this.end = await this.campaignContract.methods.end().call();
    },
    async updateTimeRemaining() {
      const currentTime = bigInt(Math.floor(Date.now() / 1000));
      const end = bigInt(this.end);
      this.timeRemaining = Number(bigInt.max(bigInt(0), end - currentTime));
    },
    async pledge() {
      const weiAmount = this.web3.utils.toWei(this.contribution.toString(), 'ether');

      try {
        await this.campaignContract.methods.pledge().send({
          from: this.web3.eth.defaultAccount,
          value: weiAmount
        });

        this.contribution = 0;
        await this.loadBalances();
      } catch (error) {
        console.error(error);
      }
    },
    async loadBalances() {
      if (!this.isWeb3Initialized) return;
      
      const accounts = await this.web3.eth.getAccounts();
      const balances = {};

      for (let i = 0; i < accounts.length; i++) {
        const address = accounts[i];
        const balance = await this.web3.eth.getBalance(address);
        balances[address] = this.web3.utils.fromWei(balance, 'ether');
      }

      this.balances = balances;
    }
  }
};
</script>
