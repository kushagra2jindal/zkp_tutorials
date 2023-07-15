const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const testData = {
    coordinatorPublicKey: '0xF6C48F1c3A98a6E64C21992Cf23Eb21Bc2135b95',
    coordinatorPvtKey: '0x2bb8e8f2de02154facfbd12d669d944690b42b843e53e867ae0b8ffb2545c099',
    vGx: 51835784888018826928282133600884436377030244243111729276390659421838645222028n,
    vGy: 105013680327458971907128651717643554091123628665588139519859029414367628005829n,
    a1x: 46691271999822305298911408955611933327117004826791095533589934448034966713892n,
    a1y: 79506021154692930877033247678375275888787398185925149734652782528972829800654n,
    a2x: 100924990255299036115759692238322732961312462362238958472125184622715303925648n,
    a2y: 84117751913416517561941605724369294546623030030082661091775608564682458536962n
};

const verifierContractAddress = '0x76da5Eb2878db4eCE3aB81C2bF4eF5cC7048Fa46';

const callVerifier = async() => {

    const params = await web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'],
        [
            testData.a1x, 
            testData.a1y, 
            testData.a2x, 
            testData.a2y, 
            testData.vGx, 
            testData.vGy
        ]
    );

    console.log('0xad99dfd9' + params.slice(2))

    const txnObject = {
        from: testData.coordinatorPublicKey,
        to: verifierContractAddress,
        data: '0xad99dfd9' + params.slice(2),
        value: 0,
        gas: 150000,
        maxFeePerGas: 43109152170
    }

    const signedTxn = await web3.eth.accounts.signTransaction(
        txnObject, 
        testData.coordinatorPvtKey
    );
    const txn = await web3.eth.sendSignedTransaction(
        signedTxn.rawTransaction
    );
    console.log(txn);

}

callVerifier();