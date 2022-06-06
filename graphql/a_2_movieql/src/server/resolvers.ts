import { IExecutableSchemaDefinition } from '@graphql-tools/schema';
import { getMovie, getMovies } from './db';

const resolvers: IExecutableSchemaDefinition['resolvers'] = {
  Query: {
    allMovies(): Promise<any> {
      return getMovies();
    },

    movie(root, { id }): Promise<any> {
      return getMovie(id);
    },
  },
};

export default resolvers;
