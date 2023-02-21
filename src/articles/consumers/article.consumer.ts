import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ArticlesService } from '../articles.service';

@Processor('author')
export class ArticleConsumer {
  constructor(private readonly articlesService: ArticlesService) {}
  @Process('register')
  async registerArticle(job: Job<unknown>) {
    console.log(job.data);
  }
}
