import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageService } from './image.service';
import { S3Service } from './../aws/aws-s3.service';

@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() bodyData: CreateImageDto,
  ) {
    console.log(file);
    console.log(bodyData);
    return this.imageService.uploadImage(uuid(), file);
  }

  @Post('s3upload')
  @UseInterceptors(FileInterceptor('file'))
  s3UploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() bodyData: CreateImageDto,
  ) {
    console.log(file);
    console.log(bodyData);
    return this.imageService.s3UploadImage(uuid(), file);
  }
}
