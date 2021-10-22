import { UserInputError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../apollo/context';
import { createUser, getUserById, getUsers } from '../services/auth0Service';
import { Account } from '../typedefs/account';
import { CreateAccountInput } from '../typedefs/createAccountInput';
import { UpdateAccountInput } from '../typedefs/updateAccountInput';
@Resolver()
export class AccountResolver {
  @Query(() => Account)
  async viewer(@Ctx() ctx: Context): Promise<Account> {
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

  @Query(() => Account)
  async account(@Arg('id') accountId: string): Promise<Account> {
    const { created_at, user_id, email, last_login, name } = await getUserById(accountId);

    return {
      id: user_id,
      name,
      email,
      lastLogin: new Date(last_login),
      createdAt: new Date(created_at),
    };
  }

  @Query(() => [Account], { nullable: 'itemsAndList' })
  async accounts(): Promise<Account[]> {
    const users = await getUsers();

    return users.map(({ created_at, user_id, email, last_login, name }) => ({
      id: user_id,
      name,
      email,
      lastLogin: new Date(last_login),
      createdAt: new Date(created_at),
    }));
  }

  @Mutation()
  createAccount(@Arg('createAccountInput') { email, password }: CreateAccountInput) {
    return createUser(email, password);
  }

  @Mutation()
  async updateAccount(
    @Arg('AccountId') accountId: string,
    @Arg('updateAccountInput') { email, password, newPassword }: UpdateAccountInput
  ) {
    if (!email && !password && !newPassword) {
      throw new UserInputError('You must supply some account data to update');
    }

    if (email && password && newPassword) {
      throw new UserInputError('Email and password cannot be updated simultaneously');
    }

    if ((!password && newPassword) || (password && !newPassword)) {
      throw new UserInputError('Provide existing and new password when updating passwrod');
    }

    // update password
    if (!email) {
      const user = await getUserById(accountId);
    }
  }
}
