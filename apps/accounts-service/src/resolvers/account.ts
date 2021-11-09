import { UserInputError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../apollo/context';
import { Account } from '../typedefs/account';
import { CreateAccountInput } from '../typedefs/createAccountInput';
import { UpdatePasswordInput } from '../typedefs/updatePasswordInput';
@Resolver()
export class AccountResolver {
  @Query(() => Account, { description: 'Get information of currently logged in user' })
  async viewer(
    @Ctx() { user: userContext, dataSources: { accountsAPI } }: Context
  ): Promise<Account> {
    const user = await accountsAPI.getUserById(userContext.sub);

    return accountsAPI.mapAuth0UserToAccount(user);
  }

  @Query(() => Account, { description: 'Get account by id' })
  async account(
    @Arg('id') accountId: string,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ): Promise<Account> {
    const user = await accountsAPI.getUserById(accountId);

    return accountsAPI.mapAuth0UserToAccount(user);
  }

  @Query(() => [Account], { nullable: 'itemsAndList', description: 'Get all users' })
  async accounts(@Ctx() { dataSources: { accountsAPI } }: Context): Promise<Account[]> {
    const users = await accountsAPI.getUsers();

    return users.map(accountsAPI.mapAuth0UserToAccount);
  }

  @Mutation(() => Account, { description: 'Sign up' })
  async createAccount(
    @Arg('createAccountInput') { email, password }: CreateAccountInput,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ): Promise<Account> {
    const user = await accountsAPI.createUser(email, password);
    return accountsAPI.mapAuth0UserToAccount(user);
  }

  @Mutation(() => Account, { description: 'Update account email' })
  async updateAccountEmail(
    @Arg('accountId') accountId: string,
    @Arg('newEmail') email: string,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ): Promise<Account> {
    const user = await accountsAPI.updateEmail(accountId, email);
    return accountsAPI.mapAuth0UserToAccount(user);
  }

  @Mutation(() => Account, { description: 'Update account password' })
  async updateAccountPassword(
    @Arg('accountId') accountId: string,
    @Arg('updatePasswordInput') { password, newPassword }: UpdatePasswordInput,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ): Promise<Account> {
    const { email } = await accountsAPI.getUserById(accountId);
    if (await accountsAPI.isUserAuthenticated(email, password)) {
      const user = await accountsAPI.updatePassword(accountId, newPassword);
      return accountsAPI.mapAuth0UserToAccount(user);
    }
    throw new UserInputError(`Your password is wrong`);
  }

  @Mutation(() => Boolean)
  async deleteAccount(
    @Arg('accountId') accountId: string,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ): Promise<boolean> {
    await accountsAPI.deleteUser(accountId);
    return true;
  }

  @Mutation(() => Account, { description: "Toggle account's role" })
  async toggleAccountRole(
    @Arg('accountId') accountId: string,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ) {
    const user = await accountsAPI.updateUserRole(accountId);
    return accountsAPI.mapAuth0UserToAccount(user);
  }

  @Mutation(() => Account, { description: 'Change blocked status of an account' })
  async toggleAccountBlockedStatus(
    @Arg('accountId') accountId: string,
    @Ctx() { dataSources: { accountsAPI } }: Context
  ) {
    const user = await accountsAPI.changeAccountBlockedStatus(accountId);
    return accountsAPI.mapAuth0UserToAccount(user);
  }
}
