import asyncWrapper from "../middlewares/async";
import { extractStatusCode } from "../utils";
import { BadRequestError, NotFoundError } from "../utils/error/custom";
import User from "../models/User";
import { CustomRequest, RequestHandler } from "../types/types";
import { success, error } from "../helpers/response";



export const updateMe: RequestHandler =  asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                body: { password, passConfirm, name, email },
                params: { userId },
                locals: { user }
            } = customReq;

            console.log(passConfirm, password);
            if(!password || !passConfirm || name || email)
                throw new BadRequestError("You can only use this resource to change your password");

            if(!userId)
                throw new BadRequestError(" Invalid Request userId must be provided");

            const toUpdateUser = await User.findById(userId).select("+password")
            if(!toUpdateUser)
                throw new NotFoundError("User not found");
            if((await toUpdateUser.isSameAsOld(password, toUpdateUser.password)))
                throw new BadRequestError("New password cannot be the same as the old password");

            toUpdateUser.password = password
            toUpdateUser.passConfirm = passConfirm
            await toUpdateUser.save();
            success(res, 200, undefined, "Password successfully Updated");
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
);


export const deleteMe: RequestHandler = asyncWrapper(
    async(req, res) => {
        const customReq = req as CustomRequest
        try{
            const { 
                locals: { user }
            } = customReq;
            const toDeleteUsuer = await User.findOne(user);
            toDeleteUsuer.active = false;
            await toDeleteUsuer.save({ validateBeforeSave: false });
            success(res, 204, null, "successfully deleted");
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
)