import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { S3Service } from 'src/aws/aws-s3.service';

@Injectable()
export class ImageService {
  constructor(private readonly s3Service: S3Service) {}
  async uploadImage(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지가 존재하지 않습니다.');
    }

    const uploadFilePath = `uploads/${userId}`;

    if (!existsSync(uploadFilePath)) {
      mkdirSync(uploadFilePath, { recursive: true });
    }

    const uploadPath =
      __dirname + `/../../${uploadFilePath + '/' + file.filename}`;

    writeFileSync(uploadPath, readFileSync(file.path));
  }

  async s3UploadImage(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지가 존재하지 않습니다.');
    }

    return await this.s3Service.putObject(file);
  }
}
