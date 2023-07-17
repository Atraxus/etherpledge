<template>
    <div class="popup">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="closePopup">Back</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      message: String,
    },
    methods: {
      closePopup() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  p {
    color: #020202; /* 设置字体颜色，可以使用颜色的名称或十六进制值 */
  }
  h2 {
    color: #020202; /* 设置字体颜色，可以使用颜色的名称或十六进制值 */
  }
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
    text-align: center;
 
  }
  
  .popup h2 {
    margin-top: 0;
  }
  
  .popup button {
    margin-top: 10px;
  }
  </style>
  