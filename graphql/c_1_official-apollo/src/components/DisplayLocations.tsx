import { gql, useQuery } from '@apollo/client';

interface Location {
  id: string;
  name: string;
  description: string;
  photo: string;
}

interface LocationData {
  locations: Location[];
}

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

const DisplayLocations = () => {
  const { loading, error, data } = useQuery<LocationData>(GET_LOCATIONS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      {data?.locations.map(({ id, name, description, photo }) => (
        <div key={id}>
          <h3>{name}</h3>
          <img width="400" height="250" alt="location-reference" src={photo} />
          <br />
          <b>About this location:</b>
          <b>{description}</b>
          <br />
        </div>
      ))}
    </div>
  );
};

export default DisplayLocations;
