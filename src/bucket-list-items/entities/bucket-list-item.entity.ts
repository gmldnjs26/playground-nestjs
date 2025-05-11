import { BucketList } from 'src/bucket-lists/entities/bucket-list.entity';
import { Destination } from 'src/destinations/entities/destination.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BucketListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BucketList, (bucketList) => bucketList.items)
  bucketList: BucketList;

  @ManyToOne(() => Destination, (destination) => destination.bucketListItems, {
    eager: true, // 항상 같이 destination을 가져오도록 설정
  })
  destination: Destination;

  @Column({
    type: 'boolean',
    default: false,
  })
  achieved: boolean;
}
