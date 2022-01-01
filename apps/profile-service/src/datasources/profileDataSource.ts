import { PrismaClient } from '.prisma/client';
import { Client as ElasticSearchClient } from '@elastic/elasticsearch';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Context } from '../apollo/context';
import { CreateProfileIndexRequest, elasticSearchClient, PROFILE_INDEX } from '../elasticsearch';
import { prisma } from '../prisma';
import { CreateProfileInput, UpdateProfileInput } from '../typedefs/profile';

export class ProfileDataSource extends DataSource<Context> {
  private context!: Context;
  private prismaClient: PrismaClient;
  private elasticSearch: ElasticSearchClient;

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context;
    this.prismaClient = prisma;
    this.elasticSearch = elasticSearchClient;
  }

  getAllProfiles() {
    return prisma.profile.findMany();
  }

  getProfileByAuth0Id(auth0Id: string) {
    return prisma.profile.findUnique({ where: { auth0AccountId: auth0Id } });
  }

  getProfileById(profileId: string) {
    return prisma.profile.findUnique({ where: { id: profileId } });
  }

  async getProfileByName(name: string) {
    const { body } = await elasticSearchClient.search({
      index: PROFILE_INDEX,
      body: {
        query: {
          multi_match: {
            query: name.trim(),
            fields: ['userName', 'firstName', 'lastName'],
          },
        },
      },
    });
    const firstMatchedProfileId = body.hits.hits[0]._source.id;

    return prisma.profile.findUnique({ where: { id: firstMatchedProfileId } });
  }

  async createProfile(data: CreateProfileInput) {
    const createdUser = await prisma.profile.create({
      data,
    });
    await elasticSearchClient.index<Record<string, unknown>, CreateProfileIndexRequest>({
      index: PROFILE_INDEX,
      body: {
        id: createdUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
      },
    });
    console.log('AAA finsished');
    return createdUser;
  }

  updateProfile({ id, ...input }: UpdateProfileInput) {
    return prisma.profile.update({ where: { id }, data: input });
  }

  async deleteProfile(profileId: string) {
    const deletedProfile = await prisma.profile.delete({ where: { id: profileId } });
    return deletedProfile.id;
  }
}
