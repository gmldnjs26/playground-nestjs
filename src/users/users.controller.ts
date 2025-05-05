import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthenticatedRequest } from '../common/types/request.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.shieldUserInformation(user);
  }

  @UseGuards(AccessTokenGuard)
  @Put('me')
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    const user = await this.usersService.update(userId, updateUserDto);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.shieldUserInformation(user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('me')
  async remove(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.remove(userId);
  }

  private shieldUserInformation(user: User) {
    return { ...user, password: undefined, refreshToken: undefined };
  }
}
