import mongoose from "mongoose"

export type UserType = {
    name: string,
    email: string,
    password: string,
    passConfirm: string
}

export type ProductType = {
    name: string,
    price: number,
    describtion: string,
    images: string[],
    category: string[],
    color: string[],
    size: string[]
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