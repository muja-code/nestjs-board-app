import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  constructor(private configService: ConfigService) {}

  bucketName = this.configService.get('AWS_BUCKET_NAME');
  s3 = new S3({
    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
  });

  async uploadImage(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지가 존재하지 않습니다.');
    }

    // const uploadFilePath = `uploads/${userId}`;

    // if (!existsSync(uploadFilePath)) {
    //   mkdirSync(uploadFilePath, { recursive: true });
    // }

    // const uploadPath =
    //   __dirname + `/../../${uploadFilePath + '/' + file.filename}`;

    // writeFileSync(uploadPath, readFileSync(file.path));
    // writeFileSync(uploadPath, file.buffer);

    await this.s3
      .upload({
        Bucket: this.bucketName,
        Body: readFileSync(file.path),
        Key: file.filename,
        ACL: 'public-read',
        ContentDisposition: 'inline',
      })
      .promise();
  }
}
