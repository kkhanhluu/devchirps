import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update account input' })
export class UpdateAccountInput {
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  newPassword?: string;
}
