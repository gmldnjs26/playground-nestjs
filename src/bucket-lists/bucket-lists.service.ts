import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BucketList } from './entities/bucket-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';

@Injectable()
export class BucketListsService {
  constructor(
    @InjectRepository(BucketList)
    private readonly bucketListRepository: Repository<BucketList>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    model: CreateBucketListDto,
  ): Promise<BucketList> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingBucketList = await this.bucketListRepository.findOne({
      where: { name: model.name, user: { id: userId } },
    });

    if (existingBucketList) {
      throw new BadRequestException('Bucket list already exists');
    }

    const newBucketList = this.bucketListRepository.create({
      name: model.name,
      // INFO: TypeORM에서 엔티티 간 관계(예: ManyToOne)가 정의되어 있을 때,
      // 전체 객체(여기서는 user 객체)를 그대로 전달하면 TypeORM이 자동으로 해당 객체의 ID만 추출하여 외래키로 저장합니다.
      // 즉, 데이터베이스에는 user 객체 전체가 아닌 user의 ID 값만 bucketList 테이블의 외래키 컬럼에 저장됩니다.
      user,
    });

    return this.bucketListRepository.save({
      ...newBucketList,
      user: undefined,
    });
  }

  async findById(userId: string, id: number): Promise<BucketList | null> {
    const bucketList = await this.bucketListRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!bucketList) {
      throw new NotFoundException('Bucket list not found');
    }

    return bucketList;
  }

  async findAll(userId: string): Promise<BucketList[]> {
    return this.bucketListRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async remove(userId: string, id: number): Promise<void> {
    const bucketList = await this.findById(userId, id);

    if (!bucketList) {
      throw new NotFoundException('Bucket list not found');
    }

    await this.bucketListRepository.remove(bucketList);
    // or await this.bucketListRepository.delete(id);
  }
}
