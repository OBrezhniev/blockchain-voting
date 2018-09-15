const Web3 = require('web3');
const VotingJSON = require('../build/contracts/Voting');
let web3client;
let Voting;

function setup() {
    if (typeof web3client !== 'undefined') {
        // web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    // unlock().then((res) => {
    //     console.log("unlock success");
    // })

    Voting = new web3.eth.Contract(VotingJSON.abi, VotingJSON.networks["5777"].address);

    vote("0x600e068049E7Ee86006F45b6eDd7FDf9A086D6CB", "1234");
}


function vote(from, encryptedBallot) {
    Voting.methods.vote(encryptedBallot).send({from: from, gas: 700000})
        .then(function (result) {
            console.log(result);
            resolve(result);
        }).catch(function (err) {
        console.log(err);
        resolve(err);
    });

}

