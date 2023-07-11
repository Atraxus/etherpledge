<script setup>
// 导入需要的模块和函数
import { defineExpose } from 'vue';
import { ref, onMounted } from 'vue';
import Web3 from 'web3';

// 导入路由
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 创建web3实例，如果在支持以太坊的浏览器 "Web3.providers.givenProvider" 会被设置。
const web3 = new Web3(
  Web3.givenProvider ||
    'https://sepolia.infura.io/v3/0bae90d1476b4b97b8222e545de219e9'
);

// 创建账户
// const account = web3.eth.accounts.create('123');
// 替换为你的以太坊账号的私钥
const privateKey = '0xfd3b8c962d6c2093bd8d26488174ec0b1ebb11f5cfbceb273dd83b6a95fa50fb';

// 将私钥转换为账号对象
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// 定义余额变量
const mount = ref(1);

// 在组件挂载后获取余额
onMounted(async () => {
  try {
    // 获取地址余额
    const balance = await web3.eth.getBalance(account.address);

    // 将余额赋值给mount
    mount.value = web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('获取地址余额时出错：', error);
  }
});

// 转账操作
const send= async() => {
    console.log('test send')
    // 1.构建转账的参数
    // 账户交易的次数
    const nonce= await web3.eth.getTransactionCount(account.address.value)
    console.log(nonce)
    // 获取预计转账的gas费用
    const gasPrise = web3.eth.getGasPrice()
    // 转账金额，以wei为单位
    const value =web3.utils.toWei("0.01")
    console.log(value)
    // P23 19:00https://www.bilibili.com/video/BV14A411178x?p=23&spm_id_from=pageDriver&vd_source=7550b7ac162b7a1c3b89987953b944bb
};

// 跳转到用户中心页面的方法
const gotoUserCenter = () => {
  router.push({ name: 'Web3UserCenter' });
};

const discoverCount = ref(8);
const joinedCount = ref(2);
const favoriteCount = ref(5);



</script>

<template>
<div class="container">

  <div class="logo">
    <img v-if="logoSrc" :src="src/components/UserLogo.png" alt="Logo">
  </div>

    <div class="title">
     <h1 class="title">User Center</h1>
    </div>

    <div class="divider"></div>

    <div class="account-info">
  <div class="textbox-container">
    <p class="label">Adress</p>
    <div class="label-space"></div>
    <textarea class="textbox" v-model="account.address"></textarea>
    <van-button type="secondary" class="copy-button" @click="copyText(account.address)">Copy</van-button>
  </div>
  <div class="textbox-container">
    <p class="label">PrivateKey</p>
    <div class="label-space"></div>
    <textarea class="textbox" v-model="account.privateKey"></textarea>
    <van-button type="secondary" class="copy-button" @click="copyText(account.privateKey)">Copy</van-button>
  </div>
  <div class="textbox-container">
    <p class="label">Balance</p>
    <div class="label-space"></div>
    <textarea class="textbox" v-model="mount"></textarea>
    <van-button type="secondary" class="transfer-button" @click="send">Transfer</van-button>
  </div>
  </div>
    <div><h3 class="title">Crowdfunding Project</h3></div>
    <div class="CrowdfundingProjectNumber">
      <div class="discoverCount">{{ discoverCount }}</div>
      <div class="joinedCount">{{ joinedCount }}</div>
      <div class="favoriteCount">{{ favoriteCount }}</div>
    </div>


    <div class="CrowdfundingProject">
      <van-button type="primary" class="action-button" @click="DiscoverProject">Discover</van-button>
      <van-button type="primary" class="action-button" @click="JoinedProject">Joined</van-button>
      <van-button type="primary" class="action-button" @click="FavoriteProject">Favorite</van-button>
    </div>

    <div class="StartCrowdfounding-section"> 
      <van-button type="primary" class="action-button" @click="gotoStartCrowdfounding">Start Crowdfunding</van-button>
    </div>

    <div class="User-section">
      <van-button type="primary" class="action-button" @click="gotoHome">Home</van-button>
    </div>
  </div>
</template>



<style lang="less">
h1, h2,h3 {
  text-align: center; /* 添加居中对齐样式 */
}
.container {
  justify-content: center;
  align-items: center;
  background-color: rgb(131, 175, 155);
}


.title {
  font-size: 24px;
  margin-bottom: 10px;
  color: black;
}

.divider {
  margin-bottom: 10px;
}

.account-info p {
  background-color: rgb(200, 200, 169);
  padding: 10px;
  margin: 5px 0;
}

.action-button {
  margin-top: 20px;
  width: 100%;
  margin-left: 10px;
}

.home-section {
  margin-top: 40px;
}
.textbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

}

.label {
  margin-right: 10px;
}

.textbox-wrapper {
  display: flex;
  align-items: center;
}

.textbox {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  resize: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 19px; /* 设置统一的高度 */
}


.copy-button {
  margin-left: 10px;
}
.transfer-button {
  margin-left: 10px;
}

.CrowdfundingProjectNumber {
  display: flex;
  justify-content: space-between;
  margin-top: 30px; /* 调整位置 */
}

.discoverCount {
  position: absolute;
  left: 16.67%; /* 六分之一位置 */
  font-size: 24px; /* 调整数字尺寸 */
}
.joinedCount{
  position: absolute;
  left: 50%; /* 中心位置 */
  transform: translateX(-50%);
  font-size: 24px; /* 调整数字尺寸 */
}

.favoriteCount {
  position: absolute;
  right: 16.67%; /* 六分之五位置 */
  font-size: 24px; /* 调整数字尺寸 */
}

.CrowdfundingProject {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 调整位置 */
}

.textbox-button {
  height: 20px;
}
.logo {
  position: relative;
  width: 200px; /* Adjust size as needed */
  height: 200px;
  overflow: hidden;
}

.logo-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.logo img {
  display: none;
}
.CrowdfundingProject {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.count {
  position: relative;
  top: -20px; /* 调整位置 */
  text-align: center;
  font-size: 16px;
  color: black;
}
</style>