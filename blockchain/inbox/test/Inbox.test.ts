import { Contract, ethers } from 'ethers';
import ganache from 'ganache';
import { beforeEach, describe, test } from 'mocha';
import * as assert from 'node:assert/strict';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import compileSolidity from '../compile-solidity';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { abi, byte } = compileSolidity(
  path.join(__dirname, '../contracts/Inbox.sol'),
  'Inbox',
);

const provider = new ethers.providers.Web3Provider(
  ganache.provider({
    logging: {
      logger: {
        log() {},
      },
    },
  }) as any,
);

let accounts: string[];
let inboxCaller: Contract;
let inboxTx: Contract;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await provider.listAccounts();

  // Use one of those accounts to deploy the contract
  const inbox = await new ethers.ContractFactory(
    abi,
    byte,
    provider.getSigner(),
  ).deploy(INITIAL_STRING);
  await inbox.deployTransaction.wait();

  inboxCaller = new ethers.Contract(inbox.address, abi, provider);
  inboxTx = new ethers.Contract(inbox.address, abi, provider.getSigner());
});

describe('Inbox', () => {
  test('deploys a contract', () => {
    assert.ok(inboxCaller.address);
  });

  test('has a default message', async () => {
    const message: string = await inboxCaller.message();
    assert.equal(message, INITIAL_STRING);
  });

  test('can change the message', async () => {
    const changedMessage = 'bye';
    await (await inboxTx.setMessage(changedMessage)).wait();
    const message: string = await inboxCaller.message();
    assert.equal(message, changedMessage);
  });
});
