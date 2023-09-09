import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
import path = require('path');





export const saveImageToStorage = {
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const fileExtension: string = path.extname(file.originalname);
      const fileName: string = uuidv4() + fileExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file:any, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" 
      ) {
        cb(null, true);
      } else {
        cb(new Error("invalid file type only vedio and the audio are allowed"));
      }
    }
};


export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (err) {
    console.error(err);
  }
};

