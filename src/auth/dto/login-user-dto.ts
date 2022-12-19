import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}

@ObjectType()
export class LoginUserOutput {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken?: string | null;
}
