import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{count}</h3>
        <div>
          <button
            data-testid="minus-button"
            onClick={() => setCount((prevCount) => prevCount - 1)}
            disabled={isDisabled}
          >
            -
          </button>
          <button
            data-testid="plus-button"
            onClick={() => setCount((prevCount) => prevCount + 1)}
            disabled={isDisabled}
          >
            +
          </button>
        </div>
        <div>
          <button
            style={{ backgroundColor: 'blue' }}
            data-testid="on-off-button"
            onClick={() => setIsDisabled((prevIsDisabled) => !prevIsDisabled)}
          >
            on/off
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
