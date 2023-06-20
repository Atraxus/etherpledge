# etherpledge
EtherPledge is a university project, where we intend to create a crowdfunding platform based on blockchain technologies.

## How to build
We currently only support a build with VSCode and the Solidity extension. The extension will compile the contracts and deploy them to the local Ganache instance.

1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (Downgrade to pecific version below 9.0.0; e.g. ``npm install -g npm@8.19.4``)
2. Install [Truffle](http://truffleframework.com/) globally: `npm install -g truffle`
3. Install [Vue.js](https://vuejs.org/) globally: `npm install -g @vue/cli`
4. Install [Ganache](http://truffleframework.com/ganache/) cli ``npm install -g ganache-cli``
5. Clone this repository
6. Run `npm install` in the project directory
7. Open the project directory in VSCode
8. Install the [Solidity extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
9. Install the [Truffle extension](https://marketplace.visualstudio.com/items?itemName=trufflesuite-csi.truffle-vscode)
10. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
11. Run `truffle init` in the project directory and say no to all questions
12. Right click on `contracts/EtherPledge.sol` and select `Build Contract`
13. Right click on `contracts/EtherPledge.sol` and select `Deploy Contract to Network`
14. Select `development` as the network

### Frontend
1. Enter the my-project directory
2. Setup the project with `npm install`
3. Download the [Metamask](https://metamask.io/) extension for your browser