import * as crypto from 'node:crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;

  constructor(
    public prevHash: string,
    public height: number,
    public data: string,
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private _blocks: Block[] = [];

  private getprevHash() {
    if (this._blocks.length < 1) {
      return '';
    }
    return this._blocks.at(-1)!.hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getprevHash(),
      this._blocks.length + 1,
      data,
    );
    this._blocks.push(newBlock);
  }

  get blocks(): Block[] {
    return this._blocks.slice();
  }
}

const blockchain = new Blockchain();
blockchain.addBlock('First one');
blockchain.addBlock('Second one');
blockchain.addBlock('Third one');
blockchain.addBlock('Fourth Block');

console.log('🚀 ~ file: main.ts ~ line 56 ~ blocks', blockchain.blocks);
