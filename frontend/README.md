# etherpledge
EtherPledge is a university project, where we intend to create a crowdfunding platform based on blockchain technologies.

## How to build
We currently only support a build with VSCode and the Solidity extension. The extension will compile the contracts and deploy them to the local Ganache instance.

### Prerequisites
1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (Downgrade to pecific version below 9.0.0; e.g. ``npm install -g npm@8.19.4``)
2. Install [Truffle](http://truffleframework.com/) globally: `npm install -g truffle`
3. Install [Vue.js](https://vuejs.org/) globally: `npm install -g @vue/cli`
4. Install [Ganache](http://truffleframework.com/ganache/) globally: ``npm install -g ganache-cli``
5. Clone this repository
6. Run `npm install` in the project directory

### Backend
Run the following commands in the project directory:
1. ``ganache-cli`` (in a separate terminal)
2. ``truffle compile``
3. ``truffle migrate --network development``

### Frontend
- Run ``npm run serve`` and open the displayed URL in your browser


## Project Setup

1. Clone the project from GitHub: `git clone <repository_url>`
2. Open the project in Visual Studio Code.
3. Deploy the contract.

## Install Dependencies

In the terminal of the Visual Studio Code console, follow these steps:

1. Install Vue CLI globally: `npm install -g @vue/cli`
2. Install web3: `npm install web3`
3. Install big-integer: `npm install big-integer`

## Setup MetaMask

1. Download and install MetaMask.
2. Connect MetaMask with Truffle by adding the Truffle address and chain ID:
   - Network Name: ETH
   - New RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
3. Import an account from Ganache into MetaMask.

## Start Vue

In the terminal of the Visual Studio Code console, run the following command:

- To start Vue: `npm run serve`
- To build Vue (if needed): `npm run build`

Please note that you may need to adjust the instructions based on your specific project and configuration. Make sure to replace `<repository_url>` with the actual URL of your GitHub repository.
