import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AwsSdkModule } from 'nest-aws-sdk';
import { multerOptionsFactory } from 'src/utills/multer.options.factory';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
