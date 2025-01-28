import { validateHeaderName } from "http";
import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import Address from "../models/Address";
import { CustomRequest, RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";
import { BadRequestError } from "../utils/error/custom";
import User from "../models/User";



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

            user.address = savedAddress.id;
            await user.save({ validateBeforeSave: false });

            success(res, 201, undefined, savedAddress);
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)

export const updateAddress:  RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                locals: { user },
                params: { id },
                body
            } = customReq;

            if(user.address.toString() !== id )
                throw new BadRequestError("the provided address id does not belongs to this user")

            const updateAddress = await Address.findByIdAndUpdate(id, {
                $set:  body 
            },
            { new: true }
            );

            success(res, 201, undefined, updateAddress);
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
);

export const deleteAddress: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                locals: { user },
                params: { id },
            } = customReq;

            console.log(user.address.toString(), id);
            if(user.address.toString() !== id )
                throw new BadRequestError("the provided address id does not belongs to this user")

            await Address.findByIdAndUpdate(id);

            user.address = undefined;
            await user.save({ validateBeforeSave: false });

            success(res, 204, undefined, "Address has been deleted");
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)


export const getUserAddress: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest;
        try{
            const {
                locals: { user }
            } = customReq;
            const userWithAddress = await User.findOne(user).populate("address");
            success(res, 200, userWithAddress, undefined );
        }catch(e){
            const statusCode = extractStatusCode(e);
             error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
        }
    }
)