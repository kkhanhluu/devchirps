/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildSubgraphSchema, printSubgraphSchema } from '@apollo/subgraph';
import { addResolversToSchema, GraphQLResolverMap } from 'apollo-graphql';
import { specifiedDirectives } from 'graphql';
import gql from 'graphql-tag';
import { buildSchema, BuildSchemaOptions, createResolversMap } from 'type-graphql';
import {
  ExtendsDirective,
  ExternalDirective,
  KeyDirective,
  ProvidesDirective,
  RequiresDirective,
} from './federationDirectives';
import { DateTimeScalar } from './scalars/DateTime';

const federationDirectives = [
  KeyDirective,
  ExtendsDirective,
  ExternalDirective,
  RequiresDirective,
  ProvidesDirective,
];

export async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<any>
) {
  const schema = await buildSchema({
    ...options,
    directives: [...specifiedDirectives, ...federationDirectives, ...(options.directives || [])],
    scalarsMap: [{ type: Date, scalar: DateTimeScalar }],
    skipCheck: true,
  });

  const federatedSchema = buildSubgraphSchema({
    typeDefs: gql(printSubgraphSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  });

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers);
  }

  return federatedSchema;
}
