import jwt, { JwtPayload } from "jsonwebtoken";
import { error, success } from "../helpers/response";
import asyncWrapper from "../middlewares/async";
import User from "../models/User";
import { RequestHandler } from "../types/types";
import { extractStatusCode } from "../utils";
import { BadRequestError, NotFoundError } from "../utils/error/custom";
import { correctPass, payload } from "./helper";


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


export const getUser: RequestHandler = asyncWrapper(
    async (req, res) => {
      const token = req.cookies.token;
      try {
        if (!token) {
            throw new BadRequestError("Please loging to contineu");
          }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const Id = (decoded as JwtPayload).Id;
        const user = await User.findById(Id);
  
        if (!user) {
          throw new BadRequestError("Please login again");
        }

        success(res, 200, user, undefined);
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


