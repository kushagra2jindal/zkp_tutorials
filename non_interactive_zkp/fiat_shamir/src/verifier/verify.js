const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const testData = {
    coordinatorPublicKey: '0x4E48475cD5a03C64aFEEeCDC19a81962239Ac93B',
    coordinatorPvtKey: '0x3d08d0adc606b070e07af92cfc19946479f591458810ec82dc72d0a5cd7a6645',
    vGx: '39358615109543963114331870393432815631229992310239517684574599327736433132305',
    vGy: '59350076441833346919710912009358203463241624293874524046464289322355862131960',
    a1x: '30168579221952835211793383212959672400733274426375717340925413593686010582483',
    a1y: '2167740190024280553756168244096071221743210593026922359464120809355593617938',
    a2x: '49633267543618681214946539445827248120012966909670742607195351811589062989489',
    a2y: '794042359626244268775870350233344785075095627627924102615457230926112879358'
};

const verifierContractAddress = '0x01FB5bcdc33802569D055dE9b0Ce9EEC743115e6';

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