<template>
  <div class="container">
    <h1>User Center</h1>

    <div v-if="loggedInAccount" class="account-info">
      <div class="textbox-container">
        <p class="label">Address</p>
        <textarea class="textbox" readonly>{{ loggedInAccount.address }}</textarea>
      </div>
      <div class="textbox-container">
        <p class="label">Balance</p>
        <textarea class="textbox" readonly>{{ loggedInAccount.balance }} ETH</textarea>
      </div>
    </div>

    <div v-else>
      <div class="textbox-container">
        <p class="label">Private Key</p>
        <textarea class="textbox" v-model="privateKey"></textarea>
      </div>

      <div class="action-buttons">
        <button class="action-button" @click="login" :disabled="!privateKey">Login</button>
        <button class="action-button" @click="goBack">Back</button>
      </div>
    </div>

    <div class="action-buttons" v-if="loggedInAccount">
      <button class="action-button" @click="gotoStartCrowdfunding">Start Crowdfunding</button>
      <button class="action-button" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";

export default {
  data() {
    return {
      privateKey: "",
      loggedInAccount: null,
    };
  },
  methods: {
    async login() {
      try {
        // 创建 Web3 实例
        const web3 = new Web3("http://localhost:8545");

        // 使用私钥获取账户地址
        const account = web3.eth.accounts.privateKeyToAccount(this.privateKey);
        const address = account.address;

        // 获取账户余额
        const balanceInWei = await web3.eth.getBalance(address);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");

        // 更新 loggedInAccount 对象
        this.loggedInAccount = {
          address: address,
          balance: parseFloat(balanceInEther),
        };
      } catch (error) {
        console.error(error);
        this.loggedInAccount = null;
        alert("Private key is wrong. Please input again.");
      }
    },
    goBack() {
      this.$router.push({ name: "FirstVue" });
    },
    gotoStartCrowdfunding() {
      this.$router.push({ name: "CreateCrowdfunding" });
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.account-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.textbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  margin-right: 10px;
}

.textbox {
  width: 300px;
  height: 100px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>