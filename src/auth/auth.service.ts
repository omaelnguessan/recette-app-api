import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { User, UserDocument } from '../user/schema/user.schema';
import { LoginUserInput, LoginUserOutput } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './payload/jwt-payload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(input: LoginUserInput): Promise<LoginUserOutput> {
    const { email, password } = input;
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('E-mail or Password incorrect.');
    }

    const passwordVerify = await argon2.verify(user.password, password);
    if (!passwordVerify) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: JWTPayload = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken: accessToken, refreshToken: '' };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
