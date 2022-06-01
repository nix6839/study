import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User!
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(userId: ID!, text: String!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

export default new ApolloServer({ typeDefs });
