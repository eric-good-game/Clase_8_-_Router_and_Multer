
import { Request, Response } from "express";
import ProductsApi from "../api/productsApi";

const productApi = new ProductsApi('products');

async function getAll(req:Request,res:Response){
  try {
    await productApi.getAll();
    if(!productApi.file.data.length) throw Error('No products found');
    res.json(productApi.file.data)
  } catch (error) {
    console.log(error);
    res.json({error:'No se encontraron productos'})

  }
}

async function create(req:Request,res:Response){
  
  try {
    const newProduct = await productApi.create({
      ...req.body,
      id:null
    });
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.json({error:'No se a podido guardar el producto.'})
  }
}

async function update(req:Request,res:Response){
  try {
    const product = req.body;

    const productUpdate = await productApi.update(product);

    res.json(productUpdate)

  } catch (error) {
    console.log(error);
    res.json({error:'Algo salio mal al actualizar el producto.'})
  }
}

async function getById(req:Request,res:Response){

  try {
    const id:number = req.body.id;
  
    const product = await productApi.getById(id);
  
    if(!product){
      throw Error('Not product')
    }

    res.json(product)
  } catch (error) {
    console.log(error);
    res.json({error:'Producto no encontrado.'})
  }


}

async function deleted(req:Request,res:Response){

  try {
    const id:number = req.body.id;
    const msg = await productApi.deleted(id)
    res.json(msg)
  } catch (error) {
    console.log(error);
    res.json({error:'Algo fallo al intentar eliminar el producto.'})
  }

}

export default {
  getAll,
  create,
  update,
  deleted,
  getById
}