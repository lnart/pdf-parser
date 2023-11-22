import { Router } from "express";
import fs from 'fs'
import path from 'path'
import pdfParse from 'pdf-parse'
const router = Router()
import { upload, uploadsdir} from "..//multerConfig/multer";
import { config } from "dotenv";

config()

router.post('/api/v1/upload', upload.single('file'), async(req, res) => {
    if(req.file){
      let buffer = fs.readFileSync(req.file.path)
      pdfParse(buffer).then(function(data) {
        res.json({text: data.text})
      })
    }
  })

  router.get('/api/v1/uploads', async (req, res) => {
    try {
      const files = fs.readdirSync(uploadsdir);
      const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
  
      const fileData = await Promise.all(pdfFiles.map(async (file) => {
        const filePath = path.join(uploadsdir, file);
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return { filename: file, text: data.text };
      }));
  
      res.json(fileData);
    } catch (err) {
      console.error('Error reading files:', err);
      res.status(500).send('Error reading files');
    }
  });


  router.delete("/api/v1/delete/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsdir, filename);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.status(404).json({ message: 'File not found' });
        } else {
          console.error('Error deleting file:', err);
          res.status(500).json({ message: 'Error deleting file' });
        }
      } else {
        res.status(200).json({ message: 'File deleted successfully' });
      }
    });
  })