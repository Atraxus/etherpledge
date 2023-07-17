<template>
  <div class="container">
    <h1>Create a New Campaign</h1>
    <div class="project-container">
      <div class="form">
        <div class="input-field">
          <h2>Project Name:</h2>
          <input type="text" id="projectName" v-model="newCampaign.name" />
        </div>
        <div class="input-field">
          <h2>Project Description:</h2>
          <input
            type="text"
            id="projectDescription"
            v-model="newCampaign.info"
          />
        </div>
        <div class="input-field">
          <h2>Author:</h2>
          <input type="text" id="projectAuthor" v-model="newCampaign.author" />
        </div>
        <div class="input-field">
          <h2>Goal (ETH):</h2>
          <input type="number" id="goal" v-model="newCampaign.goal" />
        </div>
        <div class="input-field">
          <h2>Duration (hours):</h2>
          <input type="number" id="duration" v-model="newCampaign.duration" />
        </div>
        <button
          class="create-button"
          @click="createProject"
          :disabled="!isWeb3Initialized"
        >
          Create Project
        </button>
      </div>
    </div>
    <!-- 使用弹窗组件 -->
    <Popup v-if="showPopup" :title="popupTitle" :message="popupMessage" @close="closePopup" />
  </div>
</template>

<script>
import Web3 from "web3";
import CampaignContract from "../../../build/contracts/Campaign.json";
import axios from "axios";
import Popup from "@/components/Popup.vue";

export default {
  components: {
    Popup,
  },
  data() {
    return {
      web3: null,
      isWeb3Initialized: false,
      showPopup: false,
      popupTitle: "",
      popupMessage: "",
      newCampaign: {
        name: "",
        info: "",
        author: "",
        authorInfo: "",
        goal: 0,
        duration: 0,
        descriptions: [],
      },
      contractAbi: CampaignContract.abi,
      contractBytecode: CampaignContract.bytecode,
    };
  },

  async mounted() {
    await this.initializeWeb3();
  },

  methods: {
    async initializeWeb3() {
      try {
        this.web3 = new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545") //change to your local ganache
        );

        const accounts = await this.web3.eth.getAccounts();
        this.web3.eth.defaultAccount = accounts[0];

        this.isWeb3Initialized = true;
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
      }
    },

    async createProject() {
      // Convert goal to Wei
      const goalInWei = this.web3.utils.toWei(this.newCampaign.goal.toString(), "ether");

      // Create a new contract instance without deploying
      const campaignContract = new this.web3.eth.Contract(this.contractAbi);

      // Estimate gas
      const gas = await campaignContract
        .deploy({
          data: this.contractBytecode,
          arguments: [
            goalInWei,
            this.newCampaign.duration,
            this.newCampaign.descriptions,
          ],
        })
        .estimateGas();

      const gasLimit = BigInt(Math.floor(Number(gas) * 1.2));

      // Deploy the contract
      console.log(
        "Bytecode size:",
        this.contractBytecode.length / 2 / 1024,
        "KB"
      );
      const campaignInstance = await campaignContract
        .deploy({
          data: this.contractBytecode,
          arguments: [
            goalInWei,
            this.newCampaign.duration,
            this.newCampaign.descriptions,
          ],
        })
        .send({ from: this.web3.eth.defaultAccount, gas: gasLimit });

      // Now campaignInstance.options.address holds the address of the newly deployed contract
      console.log(
        `New campaign deployed at ${campaignInstance.options.address}`
      );

      // Write new entry in the database
      let end = new Date();
      end.setHours(end.getHours() + this.newCampaign.duration);
      const campaignData = {
        name: this.newCampaign.name,
        info: this.newCampaign.info,
        author: this.newCampaign.author,
        authorInfo: this.newCampaign.authorInfo,
        goal: this.newCampaign.goal,
        end: end,
        descriptions: this.newCampaign.descriptions,
        address: campaignInstance.options.address, // the address of the new contract
        abi: this.contractAbi, // the abi of the contract
      };
      console.log(
        "Saving the following campaign in the database:",
        campaignData
      );

      try {
        const response = await axios.post(
          "http://localhost:3000/api/campaigns",
          campaignData
        );
        console.log(
          "Successfully saved the campaign in the database:",
          response.data
        );
      } catch (error) {
        console.error("Failed to save the campaign in the database:", error);
      }

      // Reset the form
      this.newCampaign.name = "";
      this.newCampaign.info = "";
      this.newCampaign.author = "";
      this.newCampaign.authorInfo = "";
      this.newCampaign.goal = 0;
      this.newCampaign.duration = 0;
      this.newCampaign.descriptions = [];
      this.showPopup = true;
      this.popupTitle = "New Campaign Created!";
      this.popupMessage = "Click the button below to go back to the main page.";
    },
    
    closePopup() {
      this.showPopup = false;
      this.popupTitle = "";
      this.popupMessage = "";
      this.goBack();
    },
    
    goBack() {
      // 返回到FirstVue.vue页面
      this.$router.push({ name: "FirstVue" });
    },
  },
};
</script>

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
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
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
