import mongoose, { Schema } from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt";
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
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match",
        },
        trim: true,
    },
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    carts: { type: Schema.Types.ObjectId, ref: "Cart" },
    verified: Boolean,
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passConfirm = undefined;
    next();
});
UserSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } }); // Add a query filter
    next();
});
UserSchema.methods.isSameAsOld = async function (newPass, currentPass) {
    return bcrypt.compare(newPass, currentPass);
};
const User = mongoose.model("User", UserSchema);
export default User;
