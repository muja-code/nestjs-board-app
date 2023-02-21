import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleStatus } from './article-status.enum';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ArticleStatus;
}
