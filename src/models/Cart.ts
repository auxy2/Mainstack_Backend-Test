import mongoose, { Schema } from "mongoose";
import { CartType } from "../types/types.js";

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quatity: { type: Number, default: 1 }
    }],
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Cart = mongoose.model<CartType>("Cart", CartSchema);

export default Cart;