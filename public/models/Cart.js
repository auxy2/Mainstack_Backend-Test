import mongoose, { Schema } from "mongoose";
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quatity: { type: Number, default: 1 }
        }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
