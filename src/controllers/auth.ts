import jwt, { JwtPayload } from "jsonwebtoken";
import { error, success } from "../helpers/response.js";
import asyncWrapper from "../middlewares/async.js";
import User from "../models/User.js";
import { RequestHandler, CustomRequest } from "../types/types.js";
import { extractStatusCode } from "../utils/index.js";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../utils/error/custom.js";
import { correctPass, payload } from "./helper.js";


export const signUp: RequestHandler = asyncWrapper(
    async(req , res, next) => {
        try{
            const { email } = req.body;
            const existingUser = await User.findOne({ email });
            if(existingUser){
                throw new BadRequestError("User with this email already exists");
            }
            await User.create(req.body);
            success(res, 201, undefined, "Sign up successfull please login to continue")
            }catch(e){
                const statusCode = extractStatusCode(e);
                 error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
);

export const login: RequestHandler = asyncWrapper(
    async(req, res) => {
        try{
            const { email, password } = req.body;
            console.table(req.body);
            const isUser = await User.findOne({ email }).select("+password");
            
            if(!isUser){
                throw new NotFoundError("No user exist with the email");
            }
            console.log(password, isUser.password)
            if (!(await correctPass(password, isUser.password))){
               throw new BadRequestError('Invalid email or password');
            }

            const {token, user} = payload(isUser)
            res.cookie("token", token).status(200).json(user)
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
);


export const protect: RequestHandler = asyncWrapper(
    async (req, res, next) => {
        const customReq = req as CustomRequest;
        const token = req.cookies.token;
        let jwtToken;
        try {
          if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('MainStack')
          ){
            jwtToken = req.headers.authorization.split(' ')[1];
          }
        
          const authToken = token || jwtToken
          if (!authToken) throw new UnauthenticatedError('You are not login yet');

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
        const Id = (decoded as JwtPayload).Id;
        const user = await User.findById(Id);
  
        if (!user) {
          throw new UnauthenticatedError("Please login again");
        }

        customReq.locals = { 
            ...customReq.locals,
            user 
        }
        return next()
      } catch (e) {
        const statusCode = extractStatusCode(e);
        console.log(statusCode);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
      }
    }
  );
 
 export const logout: RequestHandler = asyncWrapper(
    async(req, res) => {
        try{
            res.clearCookie("token", {sameSite: "none", secure: true}).status(200).json("User successfully loged out")
        }catch(e){
            const statusCode = extractStatusCode(e);
            error(res, statusCode, e instanceof Error ? e : new Error(String(e)))
        }
    }
)


