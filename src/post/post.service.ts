import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface PostgresError extends Error {
  code: string;
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(createPostDto: CreatePostDto): Promise<Post | null> {
    try {
      const post = this.postRepository.create(createPostDto);
      return this.postRepository.save(post);
    } catch (err) {
      if (
        err instanceof Error &&
        'code' in err &&
        (err as PostgresError).code === '23505'
      ) {
        throw new ConflictException('이미 존재하는 게시글입니다.');
      }
      throw err;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    const result = await this.postRepository.update(id, updatePostDto);
    if (result.affected === 0) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
  }
}
