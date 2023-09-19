import * as FormData from 'form-data';
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
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  const { data } = await axios.post(
    `${configService.get('FILES_CLOUD_URL')}uploads/form_data`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${configService.get(
          'FILES_CLOUD_AUTH_PUBLIC_TOKEN',
        )}`,
      },
    },
  );
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
  return data.files;
};
