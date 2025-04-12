import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './dto/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Typeorm의 기능(user.find등)을 사용하기 위해 추가
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class UsersModule {}
