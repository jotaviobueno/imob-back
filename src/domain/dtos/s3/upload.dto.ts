import { Readable } from 'stream';

export class UploadDto implements Express.Multer.File {
  bucket: 'imobproject';
  path: string;

  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  buffer: Buffer;
}
