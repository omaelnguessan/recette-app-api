import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatar?: string;

  @Field(() => String)
  token?: string;

  @Field(() => Boolean)
  emailValidation?: boolean;
}
