import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

export async function saveFile(file: string): Promise<string> {
  await fs.promises.rename(
    path.resolve(uploadConfig.tmpFolder, file),
    path.resolve(uploadConfig.uploadsFolder, file),
  );

  return file;
}

export async function deleteFile(file: string): Promise<void> {
  const filePath = path.resolve(uploadConfig.uploadsFolder, file);

  try {
    await fs.promises.stat(filePath);
  } catch {
    return;
  }

  await fs.promises.unlink(filePath);
}
