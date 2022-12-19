import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateInput, UserCreateOutput } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { JWTPayload } from '../auth/payload/jwt-payload';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserCreateOutput)
  async createUser(@Args('input') input: UserCreateInput) {
    return this.userService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDto)
  async getUserById(@CurrentUser() user: JWTPayload) {
    const { id } = user;
    return this.userService.getUserById(id);
  }
}
