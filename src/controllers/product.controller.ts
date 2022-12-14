import { Context, helpers, ObjectId } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import dbConn from "../middlewares/mongo.conn.ts";
import { IProduct } from "../types/product.type.ts";

const Product = dbConn.collection<IProduct>("products");

export const getProducts = async (ctx: Context) => {
  try {
    const products = await Product.find().toArray();
    ctx.response.status = 200;
    ctx.response.body = products;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal server error" };
  }
};

export const getProduct = async (ctx: Context) => {
  try {
    logger.debug("ctx.params");

    const { product_id } = helpers.getQuery(ctx, { mergeParams: true });
    logger.debug(product_id);
    const product = await Product.findOne({ _id: new ObjectId(product_id) });
    logger.debug(product);
    ctx.response.status = 200;

    ctx.response.body = product;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal server error" };
  }
};
export const addProduct = async (ctx: Context) => {
  try {
    const { title, author, price } = await ctx.request.body().value;
    const product = { title, author, price };
    const productId = await Product.insertOne(product);
    ctx.response.status = 201;
    ctx.response.body = {
      _id: productId,
      ...product,
    };
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal server error" };
  }
};

export const updateProduct = async (ctx: Context) => {
  try {
    const { product_id } = helpers.getQuery(ctx, { mergeParams: true });
    const { title, author, price } = await ctx.request.body().value;
    const product = await Product.findOne({ _id: new ObjectId(product_id) });
    if (product) {
      await Product.updateOne(
        { _id: product._id },
        { $set: { title, author, price } }
      );
      ctx.response.status = 201;
      ctx.response.body = {
        msg: "Product updated",
      };
    }
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal server error" };
  }
};

export const deleteProduct = async (ctx: Context) => {
  try {
    const { product_id } = helpers.getQuery(ctx, { mergeParams: true });
    const productId = await Product.deleteOne({
      _id: new ObjectId(product_id),
    });
    if (productId === 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        msg: "Product not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      msg: "Product deleted",
    };
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal server error" };
  }
};
