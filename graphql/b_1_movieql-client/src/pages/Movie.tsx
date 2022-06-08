import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      small_cover_image
    }
  }
`;

export default function Movie() {
  const params = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: params.id,
    },
  });
  console.log('🚀 ~ file: Movie.tsx ~ line 20 ~ Movie ~ loading', loading);
  console.log('🚀 ~ file: Movie.tsx ~ line 20 ~ Movie ~ data', data);

  if (loading) {
    return <p>Fetching movie...</p>;
  }

  return <h1>{data.movie.title}</h1>;
}
