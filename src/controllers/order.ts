import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import Order from "../models/Order";
import Product from "../models/Product";
import { CustomRequest, RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";
import { BadRequestError } from "../utils/error/custom";



export const createOrder: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest;
        try{
            const { 
                locals: { user },
                body
            } = customReq;

            let totalPrice = 0;
            for (const item of body.Products) {
                const { product, quantity } = item;

                if (!product || !quantity) {
                    throw new BadRequestError("Product and quantity are required for each item.");
                }

                const productDoc = await Product.findById(product);
                if (!productDoc) {
                    throw new BadRequestError(`Product with id ${product} not found.`);
                }
                totalPrice += productDoc.price * quantity;
            }
            if(!user.address){
                throw new BadRequestError("Please add your address for delivery");
            }
            body.user = user.id;
            body.address = user.address
            body.total_price = totalPrice;
            const newOrder = await Order.create(body);
            success(res, 201, undefined, newOrder);
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)