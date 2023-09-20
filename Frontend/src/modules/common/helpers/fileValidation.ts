import * as FileSystem from 'expo-file-system';

export const fileExtensionValidation = (
  filename: string, allowedExtension: string[]) => {
  const fileParts = filename.split('.');
  const extension = fileParts[fileParts.length - 1];
  return allowedExtension.includes(extension);
};

export const fileSizeValidation = async (
  filename: string, maxSizeBytes: number) => {
  const fileInfo = await FileSystem.getInfoAsync(filename);
  return fileInfo.size && fileInfo.size <= maxSizeBytes;
};
