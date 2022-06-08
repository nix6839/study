import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

interface IMovie {
  id: string;
  title: string;
}

type AllMovies = {
  allMovies: IMovie[];
};

const GET_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery<AllMovies>(GET_MOVIES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Could not fetch.</p>;
  }

  return (
    <ul>
      {data &&
        data.allMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
    </ul>
  );
}
