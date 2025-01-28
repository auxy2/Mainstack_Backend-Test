import mongoose, { Schema } from "mongoose";
import { ProductType } from "../types/types";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    describtion: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: [{ type: String, required: true }],
    color: [{ type: String, required: false }],
    size: [{ type: String, required: false }],
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


const Product = mongoose.model<ProductType>("Product", ProductSchema);

export default Product;