import mongoose, { Schema } from "mongoose";
import { AddressType } from "../types/types";


const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Address = mongoose.model<AddressType>("Address", AddressSchema);

export default Address;