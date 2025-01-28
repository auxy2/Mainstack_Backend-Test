import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import Product from "../models/Product";
import { CustomRequest, RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";



export const addproduct: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                locals: { user },
                body
            } = customReq;
            
            body.user = user.id;
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save()
            success(res, 201, undefined, savedProduct);
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)