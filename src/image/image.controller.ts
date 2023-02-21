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

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.MulterS3.File) {
  //   return this.imageService.uploadImage(uuid(), file);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() bodyData: CreateImageDto,
  ) {
    console.log(file);
    console.log(bodyData);
    return this.imageService.uploadImage(uuid(), file);
  }
}
