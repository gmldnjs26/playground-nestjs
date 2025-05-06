import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
  ) {}

  async create(model: CreateDestinationDto): Promise<Destination> {
    const existingDestination = await this.destinationRepository.findOne({
      where: { name: model.name },
    });

    if (existingDestination) {
      throw new BadRequestException('Destination already exists');
    }

    const destination = this.destinationRepository.create(model);
    const result = await this.destinationRepository.save(destination);
    return result;
  }

  async findAll(): Promise<Destination[]> {
    return this.destinationRepository.find();
  }

  async findById(id: number): Promise<Destination | null> {
    return this.destinationRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const existingDestination = await this.findById(id);
    if (!existingDestination) {
      throw new NotFoundException('Destination not found');
    }

    await this.destinationRepository.delete(id);
  }
}
