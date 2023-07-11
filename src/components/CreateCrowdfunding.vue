<template>
  <div class="container">
    <h1>Start Crowdfunding</h1>
    <div class="content">
      <p>Current network environment: {{ currentNetwork }}</p>
      <p>Set project name: <input v-model="projectName" type="text"></p>
      <p>Crowdfunding target amount: <input v-model="projectGoal" type="text"></p>
      <p>End Time: <input v-model="endTime" type="datetime-local" lang="en"></p>
      <p>project description: <textarea v-model="projectDescription" rows="4"></textarea></p>
      <button @click="deployContract">Publish contract</button>
      <p v-if="contractDeployed">{{ deploymentResult }}</p>
      <p v-if="deploymentError">{{ deploymentError }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentNetwork: '',
      projectName: '',
      projectGoal: '',
      endTime: '',
      projectDescription: '',
      contractDeployed: false,
      deploymentResult: '',
      deploymentError: ''
    }
  },
  methods: {
    deployContract() {
      // 假设 deploy() 是一个返回 Promise 的函数
      deploy().then((contractAddress) => {
        this.contractDeployed = true;
        this.deploymentResult = '发布成功，合约地址：' + contractAddress;
      }).catch((error) => {
        this.deploymentError = '发布失败，请重新设置';
      });
    }
  }
}
</script>

<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; // 表示视口的高度
  background-color: rgb(131, 175, 155);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 70%;
}

textarea {
  width: 100%;
  height: 150px;
}
</style>
