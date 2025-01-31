import { error, success } from "../helpers/response.js";
import asyncWrapper from "../middlewares/async.js";
import WishList from "../models/WishList.js";
import { extractStatusCode } from "../utils/index.js";
import { BadRequestError, NotFoundError } from "../utils/error/custom.js";
export const addWishlist = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user }, body: { productId } } = customReq;
        let wishList = await WishList.findOne({ user: user.id });
        if (!wishList) {
            wishList = await WishList.create({ user: user.id, products: [] });
        }
        if (wishList.products.find(item => item.product.toString() === productId)) {
            throw new BadRequestError("Product already exist in wishlist");
        }
        wishList.products.push({ product: productId });
        await wishList.save();
        success(res, 200, undefined, "Product added to wishlist");
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const removeWishList = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user }, body: { productId } } = customReq;
        const wishList = await WishList.findOne({ user: user.id });
        if (!wishList) {
            throw new NotFoundError("No wishslist found");
        }
        wishList.products = wishList.products.filter(item => item.product.toString() !== productId);
        await wishList.save();
        success(res, 200, undefined, "Product was successfully removed from wishList");
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const getWishlist = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user } } = customReq;
        const wishList = await WishList.findOne({ user: user.id }).populate("products.product");
        if (!wishList) {
            throw new BadRequestError("Wishlist is empty");
        }
        success(res, 200, undefined, wishList);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
