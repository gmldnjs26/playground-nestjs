import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BucketListsService } from './bucket-lists.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';
import { AuthenticatedRequest } from 'src/common/types/request.interface';

@Controller('bucket-lists')
export class BucketListsController {
  constructor(private readonly bucketListService: BucketListsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() body: CreateBucketListDto, @Req() req: AuthenticatedRequest) {
    return this.bucketListService.create(req.user?.sub || '', body);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Req() req: AuthenticatedRequest) {
    return this.bucketListService.findAll(req.user?.sub || '');
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findById(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bucketListService.findById(req.user?.sub || '', id);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bucketListService.remove(req.user?.sub || '', id);
  }
}
