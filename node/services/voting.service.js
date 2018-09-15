const Web3 = require('web3');
const VotingJSON = require('../build/contracts/Voting');
const config = require('../config');

let web3;
let Voting;

function setup() {
    if (typeof web3client !== 'undefined') {
        // web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    // unlock().then((res) => {
    //     console.log("unlock success");
    // })

    Voting = new web3.eth.Contract(VotingJSON.abi, VotingJSON.networks["5777"].address);

}



async function vote(from, encryptedBallot) {
    return Voting.methods.vote(encryptedBallot)
        .send({from: from, gas: 700000});
}

async function addToWhiteList(address) {
    return Voting.methods.addToWhiteList(address)
        .send({from: config.defaultAddress, gas: 700000});
}

function getVote(address) {
    return Voting.methods.getVote(address).call();
}

function getAddressCount() {
    return Voting.methods.addressCount().call();
}

function getUniqueAddressByIndex(index) {
    return Voting.methods.getUniqueAddressByIndex(index).call();
}

module.exports.setup = setup;
module.exports.vote = vote;
module.exports.addToWhiteList = addToWhiteList;
module.exports.getVote = getVote;
module.exports.getAddressCount = getAddressCount;
module.exports.getUniqueAddressByIndex = getUniqueAddressByIndex;
