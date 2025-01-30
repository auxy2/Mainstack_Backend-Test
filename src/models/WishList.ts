import mongoose, { Schema } from "mongoose";
import { WishListType } from "../types/types.js";

const WishListSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    }],
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const WishList = mongoose.model<WishListType>("WishList", WishListSchema);

export default WishList;