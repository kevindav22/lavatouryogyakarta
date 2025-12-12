import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const originalPath = req.file.path; 
  const compressedPath = originalPath.replace(/\.[^/.]+$/, '.webp');

  try {
    await sharp(originalPath)
      .resize({ width: 1024 }) 
      .webp({ quality: 80 }) 
      .toFile(compressedPath);

    fs.unlinkSync(originalPath);

    const stats = fs.statSync(compressedPath);

    req.file = {
      ...req.file, 
      path: compressedPath,
      filename: path.basename(compressedPath),
      mimetype: 'image/webp', 
      size: stats.size, 
    };

    next();
  } catch (error) {
    next(error);
  }
};

export { compressImage };
