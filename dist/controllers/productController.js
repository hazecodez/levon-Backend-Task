"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const productModel_1 = require("../models/productModel");
const errorClasses_1 = require("../utils/errorClasses");
//==================Controller for creating product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new productModel_1.Product(req.body);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        return next(new errorClasses_1.DatabaseError("Failed to create product"));
    }
});
exports.createProduct = createProduct;
//==================Controller for get products
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        //res.status(500).json({ error: "Failed to retrieve products" });
        return next(new errorClasses_1.DatabaseError("Failed to retrieve products"));
    }
});
exports.getProducts = getProducts;
//==================Controller for get product by Id
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        return next(new errorClasses_1.DatabaseError("Failed to retrieve product"));
    }
});
exports.getProductById = getProductById;
//==================Controller for update product
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        return next(new errorClasses_1.DatabaseError("Failed to update product"));
    }
});
exports.updateProduct = updateProduct;
//==================Controller for delete product
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        return next(new errorClasses_1.DatabaseError("Failed to delete product"));
    }
});
exports.deleteProduct = deleteProduct;
