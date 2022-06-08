import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

interface IMovie {
  id: string;
  title: string;
}

export default function Movies() {
  const client = useApolloClient();
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies));
  }, [client]);

  return (
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </div>
  );
}
