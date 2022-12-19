import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType({ isAbstract: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ required: false })
  token: string;

  @Prop({ default: false })
  emailValidation: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
