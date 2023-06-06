# etherpledge
EtherPledge is a university project, where we intend to create a crowdfunding platform based on blockchain technologies.

## How to build
We currently only support a build with VSCode and the Solidity extension. The extension will compile the contracts and deploy them to the local Ganache instance.

1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
2. Install [Truffle](http://truffleframework.com/) globally: `npm install -g truffle`
3. Install [Ganache](http://truffleframework.com/ganache/)
4. Clone this repository
5. Run `npm install` in the project directory
6. Open the project directory in VSCode
7. Install the [Solidity extension](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
8. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
9. Right click on `contracts/EtherPledge.sol` and select `Build Contract`
10. Right click on `contracts/EtherPledge.sol` and select `Deploy Contract to Network`
11. Select `development` as the network
12. Run `node exc` in the project directory
13. Right click on `index.html` and select `Open with Live Server`