import { HttpException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { environment } from 'src/config';
import { UploadDto } from 'src/domain/dtos';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: environment.AWS_S3_REGION,
    apiVersion: '2012-08-10',
    credentials: {
      accessKeyId: environment.AWS_ACCESS_ID,
      secretAccessKey: environment.AWS_ACCESS_SECRET,
    },
  });

  async upload(file: UploadDto) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: file.bucket,
          Key: file.path,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: file.mimetype,
        }),
      );

      return `https://imobproject.s3.sa-east-1.amazonaws.com/${file.path}`;
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
