import { ChangeEventHandler, useState } from 'react';
import DogPhoto from './components/DogPhoto';
import Dogs from './components/Dogs';

const App = () => {
  const [breed, setBreed] = useState('');
  const handleDogSelected: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setBreed(e.target.value);
  };
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      {/* <DisplayLocations /> */}
      <Dogs onDogSelected={handleDogSelected} />
      <DogPhoto breed={breed} />
    </div>
  );
};

export default App;
