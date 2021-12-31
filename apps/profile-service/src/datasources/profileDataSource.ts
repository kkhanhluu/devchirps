import { PrismaClient } from '.prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Context } from '../apollo/context';
import { prisma } from '../prisma';
import { CreateProfileInput, UpdateProfileInput } from '../typedefs/profile';

export class ProfileDataSource extends DataSource<Context> {
  context!: Context;
  prismaClient: PrismaClient;

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context;
    this.prismaClient = prisma;
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

  createProfile(data: CreateProfileInput) {
    return prisma.profile.create({
      data,
    });
  }

  updateProfile({ id, ...input }: UpdateProfileInput) {
    return prisma.profile.update({ where: { id }, data: input });
  }

  async deleteProfile(profileId: string) {
    const deletedProfile = await prisma.profile.delete({ where: { id: profileId } });
    return deletedProfile.id;
  }
}
