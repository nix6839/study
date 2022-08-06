import { BigNumber, ethers } from 'ethers';
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { lotteryCaller, lotteryTx, provider } from './ethers';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from('0'));
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function initial() {
      setManager(await lotteryCaller.manager());
      setPlayers(await lotteryCaller.getPlayers());
      setBalance(await provider.getBalance(lotteryCaller.address));
    }
    initial();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const accounts = await provider.listAccounts();

    setMessage('Waiting on transaction success...');

    const enterTx = await lotteryTx.enter({
      from: accounts[0],
      value: ethers.utils.parseEther(value),
    });
    await enterTx.wait();

    setMessage('You have been entered!');
  };

  const handlePickWinnerClick: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const accounts = await provider.listAccounts();

    setMessage('Waiting on transaction success...');

    const pickWinnerTx = await lotteryTx.pickWinner({ from: accounts[0] });
    await pickWinnerTx.wait();

    setMessage('A winner has been picked!');
  };

  return (
    <div>
      <h1>Lottery Contract</h1>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} people entered, competing to win{' '}
        {ethers.utils.formatEther(balance)} ether!
      </p>

      <hr />

      <form onSubmit={handleSubmit}>
        <h2>Want to try your luck?</h2>
        <label htmlFor="ether-value">
          Amount of ether to enter
          <input
            id="ether-value"
            type="number"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </label>
        <button type="submit">Enter</button>
      </form>

      <hr />

      <h2>Ready to pick a winner?</h2>
      <button type="button" onClick={handlePickWinnerClick}>
        Pick a winner
      </button>

      <hr />

      <p>{message}</p>
    </div>
  );
}

export default App;
