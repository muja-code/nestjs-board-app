import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  file: any;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
