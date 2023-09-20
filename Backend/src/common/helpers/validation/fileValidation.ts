import * as fs from 'fs';
import * as mime from 'mime-types';

export const validateFileFormat = (
  mimetype: string,
  allowedFileFormats: string[],
) => {
  return allowedFileFormats.includes(mime.extension(mimetype));
};

export const validateFileSize = async (
  fileStream: fs.ReadStream,
  allowedFileSize: number,
) => {
  return new Promise((resolve, reject) => {
    let fileSize = 0;
    fileStream.on('data', (data: Buffer) => {
      fileSize += data.byteLength;
    }).on('end', () => {
      resolve(fileSize <= allowedFileSize);
    }).on('error', (err) => {
      reject(err);
    });
  });
};
