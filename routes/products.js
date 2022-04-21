import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
} from "../controllers/products.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getProducts);
router.get("/user", auth, getProductsByUser);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
