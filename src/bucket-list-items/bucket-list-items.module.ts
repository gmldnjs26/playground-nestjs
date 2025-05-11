import { Module } from '@nestjs/common';
import { BucketListItemsService } from './bucket-list-items.service';
import { BucketListItemsController } from './bucket-list-items.controller';
import { BucketList } from 'src/bucket-lists/entities/bucket-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketListItem } from './entities/bucket-list-item.entity';
import { Destination } from 'src/destinations/entities/destination.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, BucketList, BucketListItem, Destination]),
  ],
  providers: [BucketListItemsService],
  controllers: [BucketListItemsController],
})
export class BucketListItemsModule {}
