import { PrismaClient } from '.prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Context } from '../apollo/context';
import { prisma } from '../prisma';

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
}
