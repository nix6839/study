import { BigNumber, Contract, ethers } from 'ethers';
import ganache from 'ganache';
import { beforeEach, describe, test } from 'mocha';
import * as assert from 'node:assert/strict';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import compileSolidity from '../compile-solidity';

const provider = new ethers.providers.Web3Provider(
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

let lotteryCaller: Contract;
let lotteryTx: Contract;
let accounts: string[];

async function enterAccounts(cnt: number, eth: string = '0.02') {
  for (let i = 0; i < cnt; i += 1) {
    const tx = await lotteryTx.connect(provider.getSigner(i)).enter({
      value: ethers.utils.parseEther(eth),
    });
    await tx.wait();
  }
}

beforeEach(async () => {
  accounts = await provider.listAccounts();

  const lottery = await new ethers.ContractFactory(
    abi,
    byte,
    provider.getSigner(),
  ).deploy();
  await lottery.deployTransaction.wait();

  lotteryCaller = new ethers.Contract(lottery.address, abi, provider);
  lotteryTx = new ethers.Contract(lottery.address, abi, provider.getSigner());
});

describe('Lottery Contract', () => {
  test('deploys a contract', () => {
    assert.ok(lotteryCaller.address);
    assert.ok(lotteryTx.address);
  });

  test('allows multiple accounts to enter', async () => {
    await enterAccounts(3);

    const players: string[] = await lotteryCaller.getPlayers();

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);

    assert.equal(players.length, 3);
  });

  test('requires a minimum amount of ether to enter', async () => {
    await assert.rejects(async () => {
      const tx = await lotteryTx.enter({ value: 200 });
      await tx.wait();
    });
  });

  test('only manager can call pickWinner()', async () => {
    await assert.rejects(async () => {
      const tx = await lotteryTx.connect(provider.getSigner(1)).pickWinner();
      await tx.wait();
    });
  });

  test('sends money to the winner and resets the players array', async () => {
    const tx = await lotteryTx.enter({
      value: ethers.utils.parseEther('2'),
    });
    await tx.wait();

    async function getAccountBalance(): Promise<BigNumber> {
      return provider.getBalance(accounts[0]);
    }

    const initialBalance = await getAccountBalance();
    await (await lotteryTx.pickWinner()).wait();
    const finalBalance = await getAccountBalance();
    const difference = finalBalance.sub(initialBalance);
    const moreThanWei = ethers.utils.parseEther('1.8');

    assert.ok(moreThanWei.lt(difference));

    const lotteryBalance = await provider.getBalance(lotteryCaller.address);
    assert.ok(lotteryBalance.eq(0));

    const players: string[] = await lotteryCaller.getPlayers();
    assert.equal(players.length, 0);
  });
});
