import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as argon2 from 'argon2';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(data: SignUpDto): Promise<any> {
    const user = await this.usersService.findByUsername(data.username);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashFn(data.password);
    const newUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: SignInDto): Promise<any> {
    const user = await this.usersService.findByUsername(data.username);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatched = await argon2.verify(user.password, data.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.update(userId, {
      refreshToken: undefined,
    });
  }

  async refreshAllTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isRefreshTokenMatched = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!isRefreshTokenMatched) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  private async hashFn(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  private async getTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, username: user.username },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: user.id, username: user.username },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashFn(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}
