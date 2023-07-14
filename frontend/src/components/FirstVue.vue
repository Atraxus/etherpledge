<template>
  <div class="container">
    <h1>{{ campaign.name }}</h1>
    <div class="topcontainer">
      <div class="information-container">
        <h2>Project Information</h2>
        <p>{{ campaign.info }}</p>
        <p>
          <span class="label">Goal Amount:</span> {{ campaign.goal }}
          <span class="unit">ETH</span>
        </p>
        <p>
          <span class="label">Time Remaining:</span>
          {{ timeRemaining }}
          <span class="unit">seconds</span>
        </p>
        <p>
          <span class="label">Raised Money</span> {{ raisedAmount }}
          <span class="unit">ETH</span>
        </p>
      </div>
      <div class="spacer"></div>
      <!-- Add this empty spacer element -->
      <div class="funder-information">
        <h2>Funder Information</h2>
        <p>{{ campaign.authorInfo }}</p>
        <img
          src="../assets/main.jpg"
          alt="Funder Image"
          class="funder-image"
          style="width: 50%; height: auto"
        />
      </div>
    </div>
    <div class="midcontainer">
      <div class="contributor-eth">
        <h3>Contribute ETH</h3>
        <input
          type="number"
          v-model="contribution"
          placeholder="Contribution Amount (ETH)"
        />
        <button @click="pledge" :disabled="!isWeb3Initialized">
          Contribute
        </button>
      </div>
      <div class="contributor-list">
        <h3>Contributor List</h3>
        <ul>
          <li v-for="(balance, address) in balances" :key="address">
            {{ address }}: {{ balance }} ETH
          </li>
        </ul>
      </div>
    </div>
    <div class="bottomcontainer">
      <h3>Other Projects You May Be Interested In:</h3>
      <ul>
        <li v-for="project in allCampaigns" :key="project.id">
          {{ project.name }} - {{ project.description }}
          <button @click="view(project.id)">View</button>
        </li>
      </ul>

      <button class="login-button" @click="login">Login</button>
    </div>
  </div>
</template>

<style>
.container {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;

  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
p {
  color: #fff; /* 设置字体颜色，可以使用颜色的名称或十六进制值 */
}
li {
  color: #fff; /* 设置字体颜色，可以使用颜色的名称或十六进制值 */
}
h1,
h2,
h3 {
  color: #fff;
  text-align: center;
}

.topcontainer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 40px;
}

.information-container,
.funder-information {
  flex-basis: 50%;
}

.label {
  font-weight: bold;
  font-size: 20px;
}

.unit {
  font-weight: bold;
  font-size: 18px;
}

.funder-image {
  width: 100%;
  height: auto;
  margin-top: 20px;
}
.spacer {
  width: 200px; /* Adjust the width as per your desired spacing */
}
.midcontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
}

.contributor-eth {
  margin: 0px 0;
}

.bottomcontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.login-button {
  position: absolute;
  top: 100px;
  right: 10px;

  padding: 10px 30px;
  font-size: 18px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 10px 0;
}

li button {
  padding: 5px 10px;
  font-size: 14px;
}
</style>

<script>
import Web3 from "web3";
import UserCenter from "@/components/UserCenter.vue";
import bigInt from "big-integer";
import axios from "axios";

export default {
  components: {
    UserCenter,
  },

  data() {
    return {
      // Metadata
      web3: null,
      isWeb3Initialized: false,
      privateKey: "0xd51456b59df4839f76240a0290601d60b39a01de", // Your private key
      balances: {},

      contribution: 0,
      raisedAmount: 0,
      timeRemaining: 0,
      status: "Open",

      // Etherpledge campaign
      campaign: {
        contract: null,
        name: null,
        info: null,
        author: null,
        authorInfo: null,
        goal: null,
        end: null,
        descriptions: [],
      },

      allCampaigns: [],
    };
  },

  async mounted() {
    await this.initializeWeb3();
    await this.loadCampaign();
    if (this.campaign.contract !== null) {
      this.loadBalances();
      this.updateRaisedAmount();
      this.scanPastEvents(this.campaign.contract);
      this.subscribeToNewEvents(this.campaign.contract);
    }
    setInterval(this.updateTimeRemaining, 1000);
    this.status = "Open";
  },

  methods: {
    async initializeWeb3() {
      try {
        // connect to local ganach
        this.web3 = new Web3(
          new Web3.providers.WebsocketProvider("ws://localhost:8545")
        );

        // get 10 accounts Ganache
        const accounts = await this.web3.eth.getAccounts();

        // set first account as default
        this.web3.eth.defaultAccount = accounts[0];
        console.log("Accounts:", accounts); // print account list

        this.isWeb3Initialized = true;
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
      }
    },

    async loadCampaign() {
      try {
        const response = await axios.get("http://localhost:3000/api/campaigns");
        this.campaigns = response.data;
        console.log("Campaigns:", this.campaigns);

        // contract
        this.campaign.contract = new this.web3.eth.Contract(
          this.campaigns[0].abi,
          this.campaigns[0].address
        );
        // name
        this.campaign.name = this.campaigns[0].projectName;
        // info
        this.campaign.info = this.campaigns[0].projectInfo;
        // author
        this.campaign.author = this.campaigns[0].author;
        // authorInfo
        this.campaign.authorInfo = this.campaigns[0].authorInfo;
        // goal
        this.campaign.goal = this.web3.utils.fromWei(
          this.campaigns[0].goal,
          "ether"
        );
        // end
        const date = new Date(this.campaigns[0].end);
        const timestamp = Math.floor(date.getTime() / 1000);
        this.campaign.end = timestamp;
        // descriptions
        this.campaign.descriptions = this.campaigns[0].descriptions;

        console.log("Campaign Contract:", this.campaign.contract);
        console.log("Campaign Events:", this.campaign.contract.events);
      } catch (error) {
        console.error(error);
      }
    },

    async scanPastEvents(contract) {
      try {
        const pastEvents = await contract.getPastEvents("allEvents", {
          fromBlock: 0,
          toBlock: "latest",
        });

        pastEvents.forEach((event) => {
          console.log(event);
        });
      } catch (error) {
        console.error(error);
      }
    },

    subscribeToNewEvents(contract) {
      let options = {
        fromBlock: 0,
        address: contract.options.address,
        topics: [], //What topics to subscribe to
      };

      this.web3.eth
        .subscribe("logs", options)
        .then((subscription) => {
          subscription.on("data", (event) => console.log(event));
          subscription.on("changed", (changed) => console.log(changed));
          subscription.on("error", (err) => {
            throw err;
          });
          subscription.on("connected", (nr) => console.log(nr));
        })
        .catch((error) => {
          console.error("Subscription failed:", error);
        });
    },

    async updateTimeRemaining() {
      const currentTime = bigInt(Math.floor(Date.now() / 1000));
      const end = bigInt(this.campaign.end);
      this.timeRemaining = Number(bigInt.max(bigInt(0), end - currentTime));
    },

    async pledge() {
      const weiAmount = this.web3.utils.toWei(
        this.contribution.toString(),
        "ether"
      );

      try {
        await this.campaign.contract.methods.pledge().send({
          from: this.web3.eth.defaultAccount,
          value: weiAmount,
          gas: 3000000,
        });

        this.contribution = 0;
        await this.updateRaisedAmount();
        await this.loadBalances();
        // fresh funded money
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
        balances[address] = this.web3.utils.fromWei(balance, "ether");
      }

      this.balances = balances;
    },

    async updateRaisedAmount() {
      try {
        const balance = await this.web3.eth.getBalance(
          this.campaign.contract.options.address
        );
        this.campaign.raisedAmount = this.web3.utils.fromWei(balance, "ether");
      } catch (error) {
        console.error("Failed to update raised amount:", error);
      }
    },

    login() {
      this.$router.push({ name: "UserCenter" });
    },

    timestampOneWeekFromNow() {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      return Math.floor(now.getTime() / 1000);
    },
  },
};
</script>
