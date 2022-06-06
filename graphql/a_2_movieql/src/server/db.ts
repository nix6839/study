import axios from 'axios';

const client = axios.create({
  baseURL: 'https://yts.mx/api/v2',
});

export async function getMovies(): Promise<any> {
  const {
    data: {
      data: { movies },
    },
  } = await client.get('list_movies.json');

  return movies;
}

export async function getMovie(id: string): Promise<any> {
  const {
    data: {
      data: { movie },
    },
  } = await client.get('movie_details.json', {
    params: {
      movie_id: id,
    },
  });

  return movie;
}
