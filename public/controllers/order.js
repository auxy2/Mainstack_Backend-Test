import { error, success } from "../helpers/response.js";
import asyncWrapper from "../middlewares/async.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { extractStatusCode } from "../utils/index.js";
import { BadRequestError } from "../utils/error/custom.js";
export const createOrder = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user }, body } = customReq;
        let totalPrice = 0;
        for (const item of body.products) {
            const { product, quantity } = item;
            if (!product || !quantity) {
                throw new BadRequestError("Product and quantity are required for each item.");
            }
            const productDoc = await Product.findById(product);
            if (!productDoc) {
                throw new BadRequestError(`Product with id ${product} not found.`);
            }
            totalPrice += productDoc.price * quantity;
        }
        if (!user.address) {
            throw new BadRequestError("Please add your address for delivery");
        }
        body.user = user.id;
        body.address = user.address;
        body.total_price = totalPrice;
        const newOrder = await Order.create(body);
        success(res, 201, undefined, newOrder);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const cancelOrder = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user }, params: { id } } = customReq;
        const order = await Order.findById(id);
        if (!order)
            throw new BadRequestError("Order not found");
        if (user.id !== order.user.toString())
            throw new BadRequestError("this order does not belong to you");
        await Order.findByIdAndDelete(id);
        success(res, 204, undefined, undefined);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const getOrder = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user }, } = customReq;
        const order = await Order.find({ user: user.id }).populate("address");
        if (!order)
            throw new BadRequestError("Order not found");
        success(res, 200, user, order);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
