import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BucketListItemsService } from './bucket-list-items.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { CreateBucketListItemDto } from './dto/create-bucket-list-item.dto';
import { AuthenticatedRequest } from 'src/common/types/request.interface';
import { UpdateBucketListItemDto } from './dto/update-bucket-list-item.dto';

@Controller('bucket-lists')
export class BucketListItemsController {
  constructor(
    private readonly bucketListItemsService: BucketListItemsService,
  ) {}

  @Post('/:bucketListId/items')
  @UseGuards(AccessTokenGuard)
  create(
    @Req() req: AuthenticatedRequest,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Body() body: CreateBucketListItemDto,
  ) {
    return this.bucketListItemsService.create(bucketListId, body);
  }

  @Get('/:bucketListId/items')
  @UseGuards(AccessTokenGuard)
  findAll(
    @Req() req: AuthenticatedRequest,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
  ) {
    return this.bucketListItemsService.findAll(bucketListId);
  }

  @Patch('/:bucketListId/items/:bucketListItemId')
  @UseGuards(AccessTokenGuard)
  update(
    @Req() req: AuthenticatedRequest,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Param('bucketListItemId', ParseIntPipe) bucketListItemId: number,
    @Body() body: UpdateBucketListItemDto,
  ) {
    return this.bucketListItemsService.update(
      bucketListId,
      bucketListItemId,
      body,
    );
  }

  @Delete('/:bucketListId/items/:bucketListItemId')
  @UseGuards(AccessTokenGuard)
  delete(
    @Req() req: AuthenticatedRequest,
    @Param('bucketListId', ParseIntPipe) bucketListId: number,
    @Param('bucketListItemId', ParseIntPipe) bucketListItemId: number,
  ) {
    return this.bucketListItemsService.delete(bucketListId, bucketListItemId);
  }
}
