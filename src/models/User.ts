import mongoose from "mongoose";
import validator from 'validator';


type UserType = {
    name: string,
    email: string,
    password: string,
    passConfirm: string
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be greater than 8 characters'],
        select: false,
        trim: true,
        validate: [validator.isEmail, "Invalid email address"],
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
});

const User = mongoose.model <UserType> ("User", UserSchema);

export default User;