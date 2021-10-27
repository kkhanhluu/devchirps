import { UserInputError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../apollo/context';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  isUserAuthenticated,
  mapAuth0UserToAccount,
  updateEmail,
  updatePassword,
} from '../services/auth0Service';
import { Account } from '../typedefs/account';
import { CreateAccountInput } from '../typedefs/createAccountInput';
import { UpdatePasswordInput } from '../typedefs/updatePasswordInput';
@Resolver()
export class AccountResolver {
  @Query(() => Account)
  async viewer(@Ctx() ctx: Context): Promise<Account> {
    console.log(ctx.user);
    const user = await getUserById(ctx.user.sub);

    return mapAuth0UserToAccount(user);
  }

  @Query(() => Account)
  async account(@Arg('id') accountId: string): Promise<Account> {
    const user = await getUserById(accountId);

    return mapAuth0UserToAccount(user);
  }

  @Query(() => [Account], { nullable: 'itemsAndList' })
  async accounts(): Promise<Account[]> {
    const users = await getUsers();

    return users.map(mapAuth0UserToAccount);
  }

  @Mutation(() => Account)
  async createAccount(
    @Arg('createAccountInput') { email, password }: CreateAccountInput
  ): Promise<Account> {
    const user = await createUser(email, password);
    console.log('user', user);
    return mapAuth0UserToAccount(user);
  }

  @Mutation(() => Account)
  async updateAccountEmail(
    @Arg('accountId') accountId: string,
    @Arg('newEmail') email: string
  ): Promise<Account> {
    const user = await updateEmail(accountId, email);
    return mapAuth0UserToAccount(user);
  }

  @Mutation(() => Account)
  async updateAccountPassword(
    @Arg('accountId') accountId: string,
    @Arg('updatePasswordInput') { password, newPassword }: UpdatePasswordInput
  ): Promise<Account> {
    const { email } = await getUserById(accountId);
    if (await isUserAuthenticated(email, password)) {
      const user = await updatePassword(accountId, newPassword);
      return mapAuth0UserToAccount(user);
    }
    throw new UserInputError(`Your password is wrong`);
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Arg('accountId') accountId: string): Promise<boolean> {
    await deleteUser(accountId);
    return true;
  }
}
