import { Query, Resolver } from 'type-graphql';
import { Account } from '../typedefs/account';

@Resolver()
export class AccountResolver {
  @Query(() => Account)
  viewer(): Account {
    return {
      id: '1',
      email: 'test@gmail.com',
      username: 'Test user',
    };
  }
}
