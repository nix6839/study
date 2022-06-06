import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

apolloClient
  .query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `,
  })
  .then((data) => console.log(data));

export default apolloClient;
