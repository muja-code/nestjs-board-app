import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmConfigService } from './configs/typeorm.config.service';
import { BullModule } from '@nestjs/bull';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ArticlesModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ImageModule,
  ],
})
export class AppModule {}
