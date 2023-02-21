import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleStatus } from './article-status.enum';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticleById(id: number): Promise<Article> {
    const findArticle = await this.articleRepository.findOne({ where: { id } });
    if (!findArticle) {
      throw new NotFoundException(`Can't find article id: ${id}`);
    }
    return findArticle;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<void> {
    const { title, description } = createArticleDto;
    this.articleRepository.insert({
      title,
      description,
      status: ArticleStatus.PUBLIC,
    });
  }

  async updateArticleStatus(id: number, status: ArticleStatus): Promise<void> {
    await this.getArticleById(id);
    this.articleRepository.update(id, { status });
  }
  // deleteArticle(id: string): void {
  //   const findArticle = this.getArticleById(id);
  //   this.articles = this.articles.filter(
  //     (article) => article.id !== findArticle.id,
  //   );
  // }
}
