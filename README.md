# etherpledge
EtherPledge is a university project, where we intend to create a crowdfunding platform based on blockchain technologies.

## How to build
We currently only support a build with VSCode and the Solidity extension. The extension will compile the contracts and deploy them to the local Ganache instance.

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (Downgrade to pecific version below 9.0.0; e.g. ``npm install -g npm@8.19.4``)
2. Install [Truffle](http://truffleframework.com/) globally: `npm install -g truffle`
3. Install [Vue.js](https://vuejs.org/) globally: `npm install -g @vue/cli`
4. Install [Ganache](http://truffleframework.com/ganache/) cli ``npm install -g ganache-cli``
5. Clone this repository
6. Run `npm install` in the project directory
7. Install the [Solidity extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
8. Install the [Truffle extension](https://marketplace.visualstudio.com/items?itemName=trufflesuite-csi.truffle-vscode)
9.  Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Backend
1. Open the project directory in VSCode
3.  Right click on `contracts/EtherPledge.sol` and select `Build Contract`
4.  Right click on `contracts/EtherPledge.sol` and select `Deploy Contract to Network`
5.  Select `development` as the network

Alternatively you can run the following commands in the project directory:
 - ``ganache-cli`` (in a separate terminal)
 - ``truffle compile``
 - ``truffle migrate --network development``

### Frontend
 - ``npm run serve``
 - ``npm run build``
 - ``npm run lint``


