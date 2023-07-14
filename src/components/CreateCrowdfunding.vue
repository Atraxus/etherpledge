<template>
  <div class="container">
    <h1>Create a New Project</h1>
    <div class="project-container">
      <div class="form">
        <div class="input-field">
          <h2>Project Name:</h2>
          <input type="text" id="projectName" v-model="newProject.name">
        </div>
        <div class="input-field">
          <h2>Project Description:</h2>
          <input type="text" id="projectDescription" v-model="newProject.description">
        </div>
        <div class="input-field">
          <h2>Author:</h2>
          <input type="text" id="projectAuthor" v-model="newProject.author">
        </div>
        <div class="input-field">
          <h2>Goal (ETH):</h2>
          <input type="number" id="goal" v-model="newProject.goal">
        </div>
        <div class="input-field">
          <h2>Duration (hours):</h2>
          <input type="number" id="duration" v-model="newProject.duration">
        </div>
        <button class="create-button" @click="createProject" :disabled="!isWeb3Initialized">Create Project</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
}

.project-container {
  width: 600px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.2);
}

.form {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 20px;
}

.input-field h2 {
  color: #000000;
}

.create-button {
  align-self: flex-end;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #0056b3;
}

.create-button:disabled {
  background-color: #ccc;
}
</style>

<script>
import Web3 from "web3";
import CampaignContract from "../../build/contracts/Campaign.json";

export default {
  data() {
    return {
      web3: null,
      campaignContract: null,
      isWeb3Initialized: false,
      newProject: {
        name: '',
        description: '',
        author: '',
        goal: 0,
        duration: 0,
      },
    };
  },

  async mounted() {
    await this.initializeWeb3();
  },

  methods: {
    async initializeWeb3() {
      try {
        this.web3 = new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545")//change to your locla ganach
        );

        const accounts = await this.web3.eth.getAccounts();
        this.web3.eth.defaultAccount = accounts[0];
        
        const campaignContractAddress = "0xda81c01e027f12b746817bc373a80d1854e3c763"; // replace with your smart contract address
        this.campaignContract = new this.web3.eth.Contract(
          CampaignContract.abi,
          campaignContractAddress
        );

        this.isWeb3Initialized = true;
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
      }
    },

    async createProject() {
      const weiGoal = this.web3.utils.toWei(
        this.newProject.goal.toString(),
        "ether"
      );

      try {
        // Assuming your contract's createProject function takes author and duration as additional arguments
        await this.campaignContract.methods.createProject(
          this.newProject.name,
          this.newProject.description,
          this.newProject.author,
          weiGoal,
          this.newProject.duration
        ).send({
          from: this.web3.eth.defaultAccount,
          gas: 3000000,
        });

        this.newProject.name = '';
        this.newProject.description = '';
        this.newProject.author = '';
        this.newProject.goal = 0;
        this.newProject.duration = 0;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
