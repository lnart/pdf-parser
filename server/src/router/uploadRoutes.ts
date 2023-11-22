import { Router } from "express";
import fs from 'fs'
import pdfParse from 'pdf-parse'
const router = Router()
import { upload } from "..//multerConfig/multer";
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