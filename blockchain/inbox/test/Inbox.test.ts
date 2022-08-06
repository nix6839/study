import ganache from 'ganache';
import { beforeEach, describe, test } from 'mocha';
import * as assert from 'node:assert/strict';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import compileSolidity from '../compile-solidity';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { abi, byte } = compileSolidity(
  path.join(__dirname, '../contracts/Inbox.sol'),
  'Inbox',
);

const web3 = new Web3(
  ganache.provider({
    logging: {
      logger: {
        log() {},
      },
    },
  }) as any,
);

let accounts: string[];
let inbox: Contract;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: byte,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: 1_000_000 });
});

describe('Inbox', () => {
  test('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  test('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  test('can change the message', async () => {
    const changedMessage = 'bye';
    await inbox.methods.setMessage(changedMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, changedMessage);
  });
});
