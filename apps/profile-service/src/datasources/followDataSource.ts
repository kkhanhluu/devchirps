import { PrismaClient } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Context } from '../apollo/context';
import { prisma } from '../prisma';
import { CreateFollowInput } from '../typedefs/follow';

export class FollowDataSource extends DataSource<Context> {
  private context!: Context;
  private prisma: PrismaClient;

  initialize(config: DataSourceConfig<Context>): void | Promise<void> {
    this.context = config.context;
    this.prisma = prisma;
  }

  async createFollow({ followerId, targetId }: CreateFollowInput) {
    const createdFollow = await this.prisma.follow.create({ data: { followerId, targetId } });
    const target = this.prisma.profile.findUnique({ where: { id: targetId } });
    const follower = this.prisma.profile.findUnique({ where: { id: followerId } });
    return { ...createdFollow, target, follower };
  }

  async unfollowProfile(followId: string) {
    await this.prisma.follow.delete({ where: { id: followId } });
    return followId;
  }
}
