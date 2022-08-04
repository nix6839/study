import HDWalletProvider from '@truffle/hdwallet-provider';
import * as dotenv from 'dotenv';
import Web3 from 'web3';
import compileSolidity from './compile-solidity';

dotenv.config();

const { MNEMONIC, INFURA_RINKEBY_ENDPOINT } = process.env;

if (MNEMONIC === undefined) {
  throw new Error('Please set MNEMONIC');
}
if (INFURA_RINKEBY_ENDPOINT === undefined) {
  throw new Error('Please set INFURA_RINKEBY_ENDPOINT');
}

const [, , solidityPath, contractName] = process.argv;

if (solidityPath === undefined) {
  throw new Error('Please provide solidity path');
}
if (contractName === undefined) {
  throw new Error('Please provide contract name');
}

const { abi, byte } = compileSolidity(solidityPath, contractName);

const provider = new HDWalletProvider(MNEMONIC, INFURA_RINKEBY_ENDPOINT);
const web3 = new Web3(provider);

const [account] = await web3.eth.getAccounts();
console.log('Attempting to deploy from account', account);

console.log(JSON.stringify(abi));
const contract = await new web3.eth.Contract(abi)
  .deploy({
    data: byte,
  })
  .send({ gas: 1_000_000, from: account });

console.log('Contract deployed to ', contract.options.address);
provider.engine.stop();
