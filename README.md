# etherpledge
EtherPledge is a university project, where we intend to create a crowdfunding platform based on blockchain technologies.

## How to build
We currently only support a build with VSCode, the Solidity and the Truffle extension. The extension will compile the contracts and deploy them to the local Ganache network.

### Prerequisites
1. Clone this repository
2. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (Downgrade to pecific version below 9.0.0; e.g. ``npm install -g npm@8.19.4``)
3. Install [Truffle](http://truffleframework.com/) globally: `npm install -g truffle`
4. Install [Vue.js](https://vuejs.org/) globally: `npm install -g @vue/cli`
5. Install [vant](https://vant-ui.github.io/vant/#/en-US) globally:`npm install vant`
6. Install [Ganache](http://truffleframework.com/ganache/) globally: ``npm install -g ganache-cli``
7. Run `npm install` in the project directory

### Backend
1. Go to the backend directory
2. Run ``npm install``

In VSCode:
- Go to the **Truffle Extension Tab** on the left
- Go to **Networks**
- If all dependencies are installed correctly there should be a network here
- Expand it once and click, **Start Network**
- Go to the contracts directory
- Right click on ``EtherPledge.sol`` and click ``deploy contracts``
- Then click on devel on the pop-up that appears

With Terminal (Not retested after last rework --> might be broken):
1. Go to the project root directory
2. ``ganache-cli``
3. ``truffle compile``
4. ``truffle migrate --network development``

### Frontend
- Go to the frontend directory
- Run ``npm install``
- Run ``npm run serve`` and open the displayed URL in your browser
