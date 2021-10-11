import { Query, Resolver } from 'type-graphql';

@Resolver()
export class AccountResolver {
  @Query(() => String)
  hello() {
    return 'World 1111';
  }
}
