import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleStatus } from './article-status.enum';
import { ArticlesService } from './articles.service';
import { ArticleStatusValidationPipe } from './pipes/article-status-validation.pipe';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('/:id')
  getArticleById(@Param('id') id: number): Promise<Article> {
    return this.articlesService.getArticleById(id);
  }

  @Get('/')
  getAllArticles(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createArticle(@Body() createArticleDto: CreateArticleDto): void {
    this.articlesService.createArticle(createArticleDto);
  }

  @Put('/:id/status')
  updateArticle(
    @Param('id') id: number,
    @Body('status', ArticleStatusValidationPipe) status: ArticleStatus,
  ) {
    this.articlesService.updateArticleStatus(id, status);
  }

  // @Delete('/:id')
  // deleteArticle(@Param('id') id: string) {
  //   this.articlesService.deleteArticle(id);
  // }
}
