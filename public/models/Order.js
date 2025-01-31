import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true }
        }],
    total_price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processing", "shiped", "delivered"], default: "pending" },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const Order = mongoose.model("Orders", OrderSchema);
export default Order;
