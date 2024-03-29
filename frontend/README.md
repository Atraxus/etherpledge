# etherpledge
EtherPledge is a university project, where we intend to create a crowdfunding platform based on blockchain technologies.

## How to build
We currently only support a build with VSCode and the Solidity extension. The extension will compile the contracts and deploy them to the local Ganache instance.

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (Downgrade to pecific version below 9.0.0; e.g. ``npm install -g npm@8.19.4``)
2. Install [Truffle](http://truffleframework.com/) globally: `npm install -g truffle`
3. Install [Vue.js](https://vuejs.org/) globally: `npm install -g @vue/cli`
4. Install [vant](https://vant-ui.github.io/vant/#/en-US) globally:`npm install vant`
5. Install [Ganache](http://truffleframework.com/ganache/) globally: ``npm install -g ganache-cli``
6. Clone this repository
7. Run `npm install` in the project directory

### Backend
Run the following commands in the project directory:
1. ``ganache-cli`` (in a separate terminal)
2. ``truffle compile``
3. ``truffle migrate --network development``

### Frontend
- Run ``npm run serve`` and open the displayed URL in your browser
- npm install --save-dev less-loader less
- npm install vue-router@4
- remember change the contract address,private key in the FirstVue.vue base on the deployment
