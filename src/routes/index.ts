import { Router } from "../../deps.ts";
import * as productController from "../controllers/product.controller.ts";

export const router = new Router()
  .get("/api/products", productController.getProducts)
  .get("/api/products/:product_id", productController.getProduct)
  .post("/api/products", productController.addProduct)
  .put("/api/products/:product_id", productController.updateProduct)
  .delete("/api/products/:product_id", productController.deleteProduct);
