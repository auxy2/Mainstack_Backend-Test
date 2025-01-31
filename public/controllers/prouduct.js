import { error, success } from "../helpers/response.js";
import asyncWrapper from "../middlewares/async.js";
import Product from "../models/Product.js";
import { extractStatusCode } from "../utils/index.js";
export const addproduct = asyncWrapper(async (req, res) => {
    const customReq = req;
    try {
        const { locals: { user }, body } = customReq;
        body.user = user.id;
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        success(res, 201, undefined, savedProduct);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const getProduct = asyncWrapper(async (req, res) => {
    const query = req.params.query;
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: new RegExp(query, "i") } },
                { category: { $regex: new RegExp(query, "i") } }
            ]
        });
        success(res, 200, undefined, products);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const products = asyncWrapper(async (req, res) => {
    try {
        const product = await Product.find();
        success(res, 200, undefined, product);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const productsCat = asyncWrapper(async (req, res) => {
    const category = req.params.category;
    try {
        const product = await Product.find({ category });
        success(res, 200, undefined, product);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
export const productById = asyncWrapper(async (req, res) => {
    try {
        const { params: { id } } = req;
        const product = await Product.findById(id);
        success(res, 200, undefined, product);
    }
    catch (e) {
        const statusCode = extractStatusCode(e);
        error(res, statusCode, e instanceof Error ? e : new Error(String(e)));
    }
});
