import { ContextUser } from '@devchirps/api-interface';
import { AccountDataSource } from '../datasources/accountDataSource';

export interface Context {
  user: ContextUser;
  dataSources: {
    accountsAPI: AccountDataSource;
  };
}
