const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
    networks: {
        development: {
            gas: 5800000,
            provider: function () {
                return new HDWalletProvider('among notable lumber valley caution tone choice drama tide foster hammer trend',
                    'http://localhost:7545')
            },
//            from: "0x55Cee105a3543FA830448d81FCBeaEab9ED89017",
            network_id: 5777,
            solc: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        },
    },
};
