import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateInput, UserCreateOutput } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UserDto } from './dto/user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(input: UserCreateInput): Promise<UserCreateOutput> {
    const { firstName, lastName, email, password } = input;

    const existsEmail = await this.userModel
      .find({ where: { email } })
      .countDocuments();

    if (existsEmail !== 0) {
      throw new BadRequestException('Account with this email already exists.');
    }

    const hashPassword = await argon2.hash(password);

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ id });
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      token: user.token,
      emailValidation: user.emailValidation,
    };
  }
}
