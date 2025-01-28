import mongoose from "mongoose"
import { Request, Response, NextFunction } from "express";


export type RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

export type UserType = {
    _id: string
    name: string,
    email: string,
    password: string,
    passConfirm: string,
    verified: boolean,
    active: boolean,
    isSameAsOld: (newPassword: string, oldPassword: string) => boolean;
}

export interface User {
    _id: string
    name: string,
    email: string,
    password: string,
    passConfirm: string,
    verified: boolean,
}


export interface CustomRequest extends Request {
  locals?: {
    user?: any
  };
}

export type ProductType = {
    name: string,
    user: mongoose.Types.ObjectId,
    price: number,
    describtion: string,
    images: string[],
    category: string[],
    color: string[],
    size: string[],
}

export type OrderType = {
    user: mongoose.Types.ObjectId,
    products: {
        Product: mongoose.Types.ObjectId,
        quatity: number
    }[],
    total_price: number,
    status: string,
    address: mongoose.Types.ObjectId
}

export type CartType = {
    user: mongoose.Types.ObjectId,
    products: {
        Product: mongoose.Types.ObjectId,
        quatity: number
    }[]
}

export type WishListType = {
    user: mongoose.Types.ObjectId,
    products: {
        Product: mongoose.Types.ObjectId,
    }[]
}

export type AddressType = {
    user: mongoose.Types.ObjectId,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
}