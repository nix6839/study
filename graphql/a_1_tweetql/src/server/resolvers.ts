import { IExecutableSchemaDefinition } from '@graphql-tools/schema';
import { UserInputError } from 'apollo-server';
import dummyTweets from '../dummyTweets';
import dummyUsers from '../dummyUsers';
import { Tweet, User } from './typeDefs';

const resolvers: IExecutableSchemaDefinition['resolvers'] = {
  Query: {
    allUsers(): User[] {
      return dummyUsers;
    },

    allTweets(): Tweet[] {
      return dummyTweets;
    },

    tweet(root, { id }) {
      const tweet = dummyTweets.find((tweet) => tweet.id === id);
      return tweet;
    },
  },

  Mutation: {
    postTweet(root, { text, userId }) {
      const author = dummyUsers.find((user) => user.id === userId);
      if (author === undefined) {
        throw new UserInputError('뭐하냐고');
      }

      const newTweet: Tweet = {
        id: (dummyTweets.length + 1).toString(),
        text,
        userId,
      };
      dummyTweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(root, { id }) {
      const tweet = dummyTweets.find((tweet) => tweet.id === id);
      if (tweet === undefined) {
        return false;
      }
      for (let i = 0; i < dummyTweets.length; i += 1) {
        if (dummyTweets[i].id === id) {
          dummyTweets.splice(i, 1);
          break;
        }
      }
      return true;
    },
  },

  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },

  Tweet: {
    author({ userId }) {
      return dummyUsers.find((user) => user.id === userId);
    },
  },
};

export default resolvers;
