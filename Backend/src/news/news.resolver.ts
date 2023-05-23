import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import NewsService from './news.service';
import { Injectable, UseGuards } from '@nestjs/common';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import Token from '../auth/entities/token.entity';

@Injectable()
@Resolver()
@UseGuards(AccessTokenGuard)
class NewsResolver {
  constructor(
    private readonly userService: NewsService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
}

export default NewsResolver;
