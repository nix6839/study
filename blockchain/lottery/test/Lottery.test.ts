import ganache from 'ganache';
import { beforeEach, describe, test } from 'mocha';
import * as assert from 'node:assert/strict';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import compileSolidity from '../compile-solidity';

const web3 = new Web3(
  ganache.provider({
    logging: {
      logger: {
        log() {},
      },
    },
  }) as any,
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { abi, byte } = compileSolidity(
  path.join(__dirname, '../contracts/Lottery.sol'),
  'Lottery',
);

let lottery: Contract;
let accounts: string[];

async function enterAccounts(accounts: string[], eth: string = '0.02') {
  for (const account of accounts) {
    await lottery.methods
      .enter()
      .send({ from: account, value: web3.utils.toWei(eth, 'ether') });
  }
}

async function getBalance(account: string): Promise<number> {
  const balance = await web3.eth.getBalance(account);
  return parseInt(balance, 10);
}

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: byte })
    .send({ from: accounts[0], gas: 1_000_000 });
});

describe('Lottery Contract', () => {
  test('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  test('allows multiple accounts to enter', async () => {
    await enterAccounts(accounts.slice(0, 3));

    const players: string[] = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);

    assert.equal(players.length, 3);
  });

  test('requires a minimum amount of ether to enter', async () => {
    await assert.rejects(async () => {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200,
      });
    });
  });

  test('only manager can call pickWinner()', async () => {
    await assert.rejects(async () => {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
    });
  });

  test('sends money to the winner and resets the players array', async () => {
    await enterAccounts(accounts.slice(0, 1), '2');

    async function getAccountBalance(): Promise<number> {
      return getBalance(accounts[0]);
    }

    const initialBalance = await getAccountBalance();
    await lottery.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance = await getAccountBalance();
    const difference = finalBalance - initialBalance;
    const moreThanWei = parseInt(web3.utils.toWei('1.8', 'ether'), 10);

    assert.ok(difference > moreThanWei);

    const lotteryBalance = await getBalance(lottery.options.address);
    assert.equal(lotteryBalance, 0);

    const players = await lottery.methods
      .getPlayers()
      .call({ from: accounts[0] });
    assert.equal(players.length, 0);
  });
});
