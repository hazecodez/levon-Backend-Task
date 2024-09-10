import { NextFunction, Request, Response } from "express";
import { Product } from "../models/productModel";
import { DatabaseError } from "../utils/errorClasses";

//==================Controller for creating product

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    return next(new DatabaseError("Failed to create product"));
  }
};

//==================Controller for get products

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    //res.status(500).json({ error: "Failed to retrieve products" });
    return next(new DatabaseError("Failed to retrieve products"));
  }
};

//==================Controller for get product by Id

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    return next(new DatabaseError("Failed to retrieve product"));
  }
};

//==================Controller for update product

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    return next(new DatabaseError("Failed to update product"));
  }
};

//==================Controller for delete product

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return next(new DatabaseError("Failed to delete product"));
  }
};
