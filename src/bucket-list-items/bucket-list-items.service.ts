import { Injectable, NotFoundException } from '@nestjs/common';
import { BucketListItem } from './entities/bucket-list-item.entity';
import { BucketList } from 'src/bucket-lists/entities/bucket-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from 'src/destinations/entities/destination.entity';
import { UpdateBucketListItemDto } from './dto/update-bucket-list-item.dto';
import { CreateBucketListItemDto } from './dto/create-bucket-list-item.dto';

@Injectable()
export class BucketListItemsService {
  constructor(
    @InjectRepository(BucketListItem)
    private readonly bucketListItemRepository: Repository<BucketListItem>,
    @InjectRepository(BucketList)
    private readonly bucketListRepository: Repository<BucketList>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) {}

  async create(bucketListId: number, model: CreateBucketListItemDto) {
    const existingBucketList = await this.bucketListRepository.findOne({
      where: { id: bucketListId },
    });

    if (!existingBucketList) {
      throw new NotFoundException('Bucket list not found');
    }

    const existingDestination = await this.destinationRepository.findOne({
      where: { id: model.destinationId },
    });

    if (!existingDestination) {
      throw new NotFoundException('Destination not found');
    }

    const newBucketListItem = this.bucketListItemRepository.create({
      bucketList: existingBucketList,
      destination: existingDestination,
      ...model,
    });

    return this.bucketListItemRepository.save(newBucketListItem);
  }

  async findAll(bucketListId: number) {
    const bucketList = await this.bucketListRepository.findOne({
      where: { id: bucketListId },
    });

    if (!bucketList) {
      throw new NotFoundException('Bucket list not found');
    }

    return this.bucketListItemRepository.find({
      where: { bucketList: { id: bucketListId } },
    });
  }

  async update(
    bucketListId: number,
    bucketListItemId: number,
    model: UpdateBucketListItemDto,
  ) {
    const bucketList = await this.bucketListRepository.findOne({
      where: { id: bucketListId },
    });

    if (!bucketList) {
      throw new NotFoundException('Bucket list not found');
    }

    const bucketListItem = await this.bucketListItemRepository.findOne({
      where: { id: bucketListItemId },
    });

    if (!bucketListItem) {
      throw new NotFoundException('Bucket list item not found');
    }

    return this.bucketListItemRepository.update(bucketListItemId, model);
  }

  async delete(bucketListId: number, bucketListItemId: number) {
    const bucketList = await this.bucketListRepository.findOne({
      where: { id: bucketListId },
    });

    if (!bucketList) {
      throw new NotFoundException('Bucket list not found');
    }

    const bucketListItem = await this.bucketListItemRepository.findOne({
      where: { id: bucketListItemId },
    });

    if (!bucketListItem) {
      throw new NotFoundException('Bucket list item not found');
    }

    await this.bucketListItemRepository.remove(bucketListItem);
  }
}
