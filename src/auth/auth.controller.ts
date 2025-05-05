import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { AuthenticatedRequest } from '../common/types/request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new ForbiddenException('Access Denied: User ID not found in token');
    }
    await this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshAllTokens(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;
    const refreshToken = req.user?.refreshToken;
    if (!userId || !refreshToken) {
      throw new ForbiddenException(
        'Access Denied: User ID or Refresh Token not found in token',
      );
    }
    return this.authService.refreshAllTokens(userId, refreshToken);
  }
}
