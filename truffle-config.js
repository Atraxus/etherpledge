module.exports = {
  networks: {
    development: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1",
      chainId: 1337
    },
    loc_development_development: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1",
      chainId: 1337
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};
