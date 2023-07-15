const Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');

const CONTRACT_ADDRESS = "0x2dd7a952fEbc8483b70200Cc49223ceE38d7080b";
const CONTRACT_ABI = require('../../build/contracts/Verifier.json');

const contract = new web3.eth.Contract(CONTRACT_ABI.abi, CONTRACT_ADDRESS);

async function getEvents() {
    
    const events = await contract.getPastEvents(
        'KjLog', 
        { fromBlock: 0, toBlock: 'latest' }
    );
    console.log(events);
};

getEvents();
