import bcrypt from "bcrypt"
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { User } from "../types/types.js";




export const correctPass = async (Candidiatepass: string, userPass: string) => {
    return await bcrypt.compare(Candidiatepass, userPass);
  };


const { JWT_SECRET } = process.env;

// const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
const JWTEXPIN: number = 86400;
const JWT_ISS: string = process.env.JWT_ISS || "MT"


  export const payload = (user: User) => {

  const signOptions: SignOptions = {
    expiresIn: JWTEXPIN, 
    issuer: JWT_ISS, 
  };
    const token = jwt.sign({ Id: user._id, email: user.email }, JWT_SECRET, signOptions);
  
    return { user, token };
  };
  