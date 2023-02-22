import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/utills/multer.options.factory';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { S3Service } from 'src/aws/aws-s3.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, S3Service],
})
export class ImageModule {}
