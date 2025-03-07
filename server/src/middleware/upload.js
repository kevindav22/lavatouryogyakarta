import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = 'uploads/';
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      return cb(err, null);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const compressAndConvertToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const originalPath = req.file.path;

    const imageBuffer = await fs.readFile(originalPath);

    const webpBuffer = await sharp(imageBuffer)
      .webp({ quality: 80 })
      .toBuffer();

    const webpFilename = `${path.parse(req.file.filename).name}.webp`;
    const outputPath = path.join('uploads', webpFilename);
    await fs.writeFile(outputPath, webpBuffer);

    await fs.unlink(originalPath);
    console.log('File asli berhasil dihapus:', originalPath);

    req.file.filename = webpFilename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    console.error('Error saat memproses gambar:', error.message);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengompresi gambar' });
  }
};

export { upload, compressAndConvertToWebp };
