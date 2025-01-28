import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import Address from "../models/Address";
import { CustomRequest, RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";



export const addAddress: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                locals: { user },
                body
            } = customReq;
            body.user = user.id;
            const newAddress = new Address(req.body);
            const savedAddress = await newAddress.save()
            success(res, 201, undefined, savedAddress);
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)