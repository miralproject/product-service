import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;
    const product = await productService.createProduct(name, description, price);
    res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
    const products = await productService.getProducts();
    res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
    const product = await productService.getProductById(parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { name, description, price } = req.body;
    const product = await productService.getProductById(parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const updatedProduct = await productService.updateProduct(
        parseInt(req.params.id),
        name,
        description,
        price
    );
    res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const product = await productService.getProductById(parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const deletedProduct = await productService.deleteProduct(parseInt(req.params.id));
    res.status(200).json(deletedProduct);
};
