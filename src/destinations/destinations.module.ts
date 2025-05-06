import { Module } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Destination])], // 데스티네이션 레포지토리를 사용하기 위해 추가
  providers: [DestinationsService],
  controllers: [DestinationsController],
})
export class DestinationsModule {}
