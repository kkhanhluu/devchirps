import { ApolloError } from 'apollo-server-errors';
import { GraphQLScalarType, Kind } from 'graphql';
import validator from 'validator';

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'An ISO 8601-encoded UTC date string.',
  parseValue: (value: string) => {
    if (validator.isISO8601(value)) {
      return value;
    }
    throw new ApolloError('DateTime must be a valid ISO 8601 Date string');
  },
  serialize: (value: string | Date) => {
    if (typeof value !== 'string') {
      value = value.toISOString();
    }
    if (validator.isISO8601(value)) {
      return value;
    }
    throw new ApolloError('DateTime must be a valid ISO 8601 Date string');
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError('Value is not a valid ISO 8601 Date string');
    }
    if (validator.isISO8601(ast.value)) {
      return ast.value;
    }
    throw new ApolloError('DateTime must be a valid ISO 8601 Date string');
  },
});
