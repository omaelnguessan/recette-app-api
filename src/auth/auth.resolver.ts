import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/schema/user.schema';
import { LoginUserInput, LoginUserOutput } from './dto/login-user-dto';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation((returns) => LoginUserOutput)
  async login(@Args('input') input: LoginUserInput) {
    return this.authService.login(input);
  }
}
