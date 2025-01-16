import express from 'express';
import * as productController from '../controllers/productController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.post('/', asyncHandler(productController.createProduct));
router.get('/', asyncHandler(productController.getProducts));
router.get('/:id', asyncHandler(productController.getProductById));
router.put('/:id', asyncHandler(productController.updateProduct));
router.delete('/:id', asyncHandler(productController.deleteProduct));

export default router;
