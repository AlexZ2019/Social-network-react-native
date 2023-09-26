import * as fs from 'fs';
import axios from 'axios';
import Upload from 'graphql-upload/Upload';
import { join } from 'path';
import * as mime from 'mime-types';
import { ConfigService } from '@nestjs/config';

export const uploadFile = async (
  file: Upload,
  path: string,
  configService: ConfigService,
) => {
  const { filename, mimetype, createReadStream } = await file;
  const stream = createReadStream();
  const filePath = join(
    __dirname,
    `${path}${filename}.${mime.extension(mimetype)}`,
  );
  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    writeStream.on('finish', resolve);
    writeStream.on('error', (error) => {
      fs.unlink(filePath, () => {
        reject(error);
      });
    });
    stream.on('error', (error) => writeStream.destroy(error));
    stream.pipe(writeStream);
  });
  const { data } = await axios.post(
    `${configService.get('FILES_CLOUD_URL')}?policy=${configService.get(
      'FILES_CLOUD_POLICY',
    )}&signature=${configService.get(
      'FILES_CLOUD_SIGNATURE',
    )}&key=${configService.get('FILES_CLOUD_API_KEY')}`,
    fs.createReadStream(filePath),
    {
      headers: {
        'Content-Type': mimetype,
      },
    },
  );
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
  return data;
};
