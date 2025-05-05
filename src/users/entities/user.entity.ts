import { BucketList } from 'src/bucket-lists/entities/bucket-list.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: '',
  })
  name?: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken: string;

  @OneToMany(() => BucketList, (bucketList) => bucketList.user)
  bucketLists: BucketList[];
}
