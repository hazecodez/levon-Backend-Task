import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true }
});

export const Product = mongoose.model<IProduct>("Product", productSchema);