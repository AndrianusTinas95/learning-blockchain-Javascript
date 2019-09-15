const {BlockChain,Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('e2457236a6214115dbf1351a6c35aedcf09da694fe1d8e8dd0fc2dcd21cc8d2b');
const myWalletAddress = myKey.getPublic('hex');

let CAI = new BlockChain();

const tx1 = new Transaction(myWalletAddress,'public key goes here',10);
tx1.signTransaction(myKey);
CAI.addTransaction(tx1);


console.log("\nStarting the minier.....");
CAI.minePendingTransaction(myWalletAddress);
console.log("\nBalance of TinDev is",CAI.getBalanceOfAddress(myWalletAddress));

// console.log('Is chain valid? ',CAI.isChainValid());

// CAI.chain[1].transaction[0].amount=1;
// console.log('Is chain valid? ',CAI.isChainValid());

