import { gql, useQuery } from '@apollo/client';
import { ChangeEventHandler } from 'react';

interface Dog {
  id: string;
  breed: string;
}

interface DogData {
  dogs: Dog[];
}

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

interface Props {
  onDogSelected?: ChangeEventHandler<HTMLSelectElement>;
}

const Dogs = ({ onDogSelected }: Props) => {
  const { loading, error, data } = useQuery<DogData>(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error! ${error.message}`}</p>;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data?.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
};

export default Dogs;
