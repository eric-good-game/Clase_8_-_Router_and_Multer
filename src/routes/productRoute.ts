import { Router } from "express";
import multer from "multer";
import productController from '../controllers/productController';
import dataValidator from "../middleware/dataValidator";

const router = Router();

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, 'uploads')
  },
  filename: function(req,file,cb){
    cb(null, `${file.filename}-${Date.now()}`)
  }
})

const upload = multer({storage})

router
  .get('/',productController.getAll)
  .get('/:id', dataValidator, productController.getById)
  .post('/', upload.single('preview'), dataValidator, productController.create)
  .put('/:id', upload.single('preview'), dataValidator, productController.update)
  .delete('/:id', dataValidator, productController.deleted)

export default router