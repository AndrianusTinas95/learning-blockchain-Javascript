const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index          = index;
        this.timestamp      = timestamp;
        this.data           = data;
        this.previousHash   = previousHash;
        this.hash           = '';
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0,"01/08/2019","Genesis Blok","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previousHash   = this.getLatestBlock().hash;
        newBlock.hash           = newBlock.calculateHash();
        this.chain.push(newBlock);
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
CAI.addBlock(new Block(1, "05/08/2019",{amout:4}));
CAI.addBlock(new Block(2, "08/08/2019",{amout:10}));

// console.log(JSON.stringify(CAI));

// console.log('Is blockchain valid ? ' + CAI.isChainValid());

CAI.chain[1].data = {amount:100};
CAI.chain[1].hash = CAI.chain[1].calculateHash();
// CAI.chain[1].hash = CAI.chain[2].previousHash;
console.log('Is blockchain valid ? ' + CAI.isChainValid());
