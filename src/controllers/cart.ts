import { RequestHandler } from "express";
import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import { extractStatusCode } from "../utils";
import { CustomRequest } from "../types/types";
import Cart from "../models/Cart";
import { BadRequestError, NotFoundError } from "../utils/error/custom";



export const addCart: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest;
        try{
            const {
                locals: { user },
                body: { productId, quatity }
            } = customReq; 

            let carts = await Cart.findOne({ user: user.id});
            if(!carts){
                carts = await Cart.create({user: user.id, products: []})
            }

            const existingProductIndex = carts.products.findIndex(item => item.product.toString() === productId);
            if(existingProductIndex !== -1){
                carts.products[existingProductIndex].quatity += quatity;
            }else{
                carts.products.push( { product: productId, quatity})
            }

            await carts.save();
            success(res, 201, user, carts);
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
);

export const removeCart: RequestHandler =  asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest;
        try{
            const {
                locals: { user },
                body: { productId }
            } = customReq;

            const cart = await Cart.findOne({ user: user.id });
            if(!cart){
                throw new NotFoundError("Your cart is empty");
            }


            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if(productIndex !== -1){
                if(cart.products[productIndex].quatity > 1){
                    cart.products[productIndex].quatity -= 1
                }else{
                    cart.products.splice(productIndex, 1)
                }
                await cart.save();
                success(res, 200, undefined, "item removed from cart");
            }else{
                throw new NotFoundError("the product was deleted product found in cart")
            }

        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)