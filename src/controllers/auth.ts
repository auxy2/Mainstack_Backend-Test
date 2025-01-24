import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import User from "../models/User";
import { RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";
import { BadRequestError } from "../utils/error/custom";


export const signUp: RequestHandler = asyncWrapper(
    async(req , res, next) => {
        try{
            const { email } = req.body;
            const existingUser = await User.findOne({ email });
            if(existingUser){
                throw new BadRequestError("User with this email already exists");
            }
            await User.create(req.body);
            success(res, 201, undefined, "Check your email Inbox or Spam folder for verification")
            }catch(e){
                const statusCode = extractStatusCode(e);
                 error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
)
