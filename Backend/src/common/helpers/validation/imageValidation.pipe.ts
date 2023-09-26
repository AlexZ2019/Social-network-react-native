import { Injectable, PipeTransform } from '@nestjs/common';
import Upload from 'graphql-upload/Upload';
import { validateFileFormat, validateFileSize } from './fileValidation';
import * as fs from 'fs';

const IMAGE_SIZE_TEXT = '3MB';
const IMAGE_SIZE = 3e6;

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  async transform(value: Upload) {
    if (!value.filename) {
      throw new Error('File was not provided');
    }
    const { mimetype, createReadStream } = value;
    const isFileFormatValid = validateFileFormat(mimetype, ['jpg', 'jpeg']);
    if (!isFileFormatValid) {
      throw new Error('File format is not valid');
    }
    const fileStream = createReadStream() as fs.ReadStream;
    const isFileSizeValid = await validateFileSize(fileStream, IMAGE_SIZE);
    if (!isFileSizeValid) {
      throw new Error(`File size is bigger then ${IMAGE_SIZE_TEXT}`);
    }
    return value;
  }
}
