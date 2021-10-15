import { Ctx, Query, Resolver } from 'type-graphql';
import { Account } from '../typedefs/account';

@Resolver()
export class AccountResolver {
  @Query(() => Account)
  viewer(@Ctx() ctx: any): Account {
    console.log(ctx.user, ctx.test);
    return {
      id: '1',
      email: 'test@gmail.com',
      username: 'Test user',
    };
  }
}
