const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress    = fromAddress;
        this.toAddress      = toAddress;
        this.amount         = amount;
    }
}

class Block{
    constructor(timestamp,transaction,previousHash=''){
        this.timestamp      = timestamp;
        this.transaction    = transaction;
        this.previousHash   = previousHash;
        this.hash           = '';
        this.nonce          = 0;
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    mainBlock(difficulty){
        
        while (this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("block mined: " + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransactions= [];
        this.miningReward       = 100;
    }
    createGenesisBlock(){
        return new Block("01/08/2019","Genesis Blok","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    // addBlock(newBlock){
    //     newBlock.previousHash   = this.getLatestBlock().hash;
    //     newBlock.mainBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }
    minePendingTransaction(miningRewardAddress){
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mainBlock(this.difficulty);
        
        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions =[
            new Transaction(null,miningRewardAddress,this.miningReward)
        ];
        // console.log("pendingTransactions \n" , this.pendingTransactions);
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length;i++){
            const currentBlock  = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let CAI = new BlockChain();

CAI.createTransaction(new Transaction('address1','address2',100));
CAI.createTransaction(new Transaction('address2','address1',25));

console.log("\nStarting the minier.....");
CAI.minePendingTransaction('TinDev-address');
console.log("\nBalance of TinDev is",CAI.getBalanceOfAddress('TinDev-address'));

console.log("\nStarting the minier again.....");
CAI.minePendingTransaction('TinDev-address');
console.log("\nBalance of TinDev is",CAI.getBalanceOfAddress('TinDev-address'));

console.log("\nBalance of address1 is",CAI.getBalanceOfAddress('address1'));
console.log("\nBalance of address2 is",CAI.getBalanceOfAddress('address2'));
console.log("\n");

CAI.minePendingTransaction('address2');
CAI.minePendingTransaction('address2');
CAI.minePendingTransaction('address2');
console.log("\nBalance of address2 is",CAI.getBalanceOfAddress('address2'));

console.log("\n");

CAI.minePendingTransaction('address1');
CAI.minePendingTransaction('address1');
CAI.minePendingTransaction('address1');
console.log("\nBalance of address1 is",CAI.getBalanceOfAddress('address1'));