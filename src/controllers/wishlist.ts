import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import WishList from "../models/WishList";
import { CustomRequest, RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";
import { BadRequestError } from "../utils/error/custom";


export const addWishlist: RequestHandler  = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                locals: { user },
                body: { productId }
            } = customReq;
            let wishList = await WishList.findOne({ user: user.id });
            if(!wishList){
                wishList = await WishList.create({ user: user.id, products: [] })
            }

            if(wishList.products.find(item => item.product.toString() === productId )){
                throw new BadRequestError("Product already exist in wishlist")
            }

            wishList.products.push({ product: productId });
            await wishList.save();
            success(res, 200, undefined, "Product added to wishlist")
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
);


export const removeWishList: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{ 
            const {
                locals: { user },
                body: { productId }
            } = customReq

        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
)