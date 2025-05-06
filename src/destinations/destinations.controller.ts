import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { Destination } from './entities/destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  async create(@Body() model: CreateDestinationDto): Promise<Destination> {
    return this.destinationsService.create(model);
  }

  @Get()
  async findAllDestinations(): Promise<Destination[]> {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  async findDestinationById(@Param('id', ParseIntPipe) id: number) {
    const destination = await this.destinationsService.findById(id);
    if (!destination) {
      throw new NotFoundException('Destination not found');
    }
    return destination;
  }

  @Delete(':id')
  async deleteDestination(@Param('id', ParseIntPipe) id: number) {
    await this.destinationsService.delete(id);
  }
}
