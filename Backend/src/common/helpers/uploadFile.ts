import axios from 'axios';
import Upload from 'graphql-upload/Upload';

export const uploadFile = async (
  file: Upload,
  url: string,
  params: any = {},
) => {
  const { mimetype, createReadStream } = await file;
  const { data } = await axios.post(url, createReadStream(), {
    headers: {
      'Content-Type': mimetype,
    },
    params,
  });
  return data;
};
