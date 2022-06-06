import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

export default new ApolloServer({ typeDefs, resolvers });
