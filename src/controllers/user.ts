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
                body: { password, passConfirm },
                params: { userId },
                locals: { user }
            } = customReq;
            console.log(user)
            if(!password || passConfirm)
                throw new BadRequestError("You can only use this resource to change your password");

            if(!userId)
                throw new BadRequestError(" Invalid Request userId must be provided");

            const toUpdateUser = await User.findById(userId)
            if(!toUpdateUser)
                throw new NotFoundError("User not found");

            toUpdateUser.password = password
            toUpdateUser.passConfirm = passConfirm
            await toUpdateUser.save();
            success(res, 200, user, "Password successfully Updated");
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
)

