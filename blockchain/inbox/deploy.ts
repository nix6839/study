import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import compileSolidity from './compile-solidity';

dotenv.config();

const { MNEMONIC, INFURA_RINKEBY_PROJECT_ID } = process.env;

if (MNEMONIC === undefined) {
  throw new Error('Please set MNEMONIC');
}
if (INFURA_RINKEBY_PROJECT_ID === undefined) {
  throw new Error('Please set INFURA_PROJECT_ID');
}

const [, , solidityPath, contractName] = process.argv;

if (solidityPath === undefined) {
  throw new Error('Please provide solidity path');
}
if (contractName === undefined) {
  throw new Error('Please provide contract name');
}

const { abi, byte } = compileSolidity(solidityPath, contractName);

console.log('ABI', JSON.stringify(abi));

const provider = new ethers.providers.InfuraProvider(
  'rinkeby',
  INFURA_RINKEBY_PROJECT_ID,
);
const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
const account = wallet.connect(provider);
const contract = await new ethers.ContractFactory(abi, byte, account).deploy(
  'Hi there!',
);

await contract.deployTransaction.wait();

console.log('Contract deployed to ', contract.address);
