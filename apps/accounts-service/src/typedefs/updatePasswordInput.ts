import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update password input' })
export class UpdatePasswordInput {
  @Field()
  password: string;
  @Field()
  newPassword: string;
}
