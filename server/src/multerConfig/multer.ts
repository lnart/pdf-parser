import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/lennartp./pdf-upload-parser/server/src/uploads');
    },
    filename: function (req, file, cb) {
      if (!file.originalname) {
        cb(new Error('Original filename is undefined'), file.originalname);
      } else {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    }
  });
  
  
  export const upload = multer({
    storage:storage,
    fileFilter: function(req, file, cb){
      if(path.extname(file.originalname) !== '.pdf'){
        return cb(new Error('only PDF files are allowed')) 
      }
      cb(null, true)
    }
  })
  
  export const uploadsdir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsdir)){
    fs.mkdirSync(uploadsdir, { recursive: true });
  }