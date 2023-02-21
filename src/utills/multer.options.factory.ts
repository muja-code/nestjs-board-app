import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { diskStorage, memoryStorage } from 'multer';
import { extname, basename } from 'path';

export const multerOptionsFactory = (): MulterOptions => {
  // return {
  //   storage: memoryStorage(),
  //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 크기를 제한
  // };

  return {
    storage: diskStorage({
      filename(req, file, cb) {
        // 파일의 이름을 설정합니다.
        const imageExt = extname(file.originalname); // 파일 확장자 추출
        const imageBasename = basename(file.originalname, imageExt); // 파일 이름
        // 파일 이름이 중복되는 것을 막기 위해 '파일이름_날짜.확장자' 의 형식으로 파일이름을 지정합니다.
        cb(null, `${imageBasename}_${Date.now()}${imageExt}`);
      },
    }),
  };
};
