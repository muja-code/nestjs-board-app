import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ArticleStatus } from '../article-status.enum';

export class ArticleStatusValidationPipe implements PipeTransform {
  readonly statusOption = [ArticleStatus.PRIVATE, ArticleStatus.PUBLIC];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not status option!`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    return this.statusOption.indexOf(status) !== -1;
  }
}
