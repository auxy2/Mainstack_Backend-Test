import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt"
import { UserType } from "../types/types";



const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
     },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be greater than 8 characters'],
        select: false,
        trim: true,
      },
      passConfirm: {
        type: String,
        required: true,
        validate: {
          validator: function (el: string): boolean {
            return el === (this as UserType).password;
          },
          message: "Passwords do not match",
        },
        trim: true,
      },
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passConfirm = undefined;
    next();
  });

const User = mongoose.model <UserType> ("User", UserSchema);

export default User;