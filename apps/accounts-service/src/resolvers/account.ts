import { Ctx, Query, Resolver } from 'type-graphql';
import { getUserById } from '../services/auth0Service';
import { Account } from '../typedefs/account';
@Resolver()
export class AccountResolver {
  @Query(() => Account)
  async viewer(@Ctx() ctx: any): Promise<Account> {
    console.log(ctx.user);
    const { created_at, user_id, email, last_login, name } = await getUserById(ctx.user.sub);

    return {
      id: user_id,
      name,
      email,
      lastLogin: new Date(last_login),
      createdAt: new Date(created_at),
    };
  }
}
