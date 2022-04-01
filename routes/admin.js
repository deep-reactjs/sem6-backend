import express from "express";
import {
  getUsers,
  //   getUserById,
  getProducts,
  getProductsByUser,
  getProductById,
  getCategories,
  getCategoriesByUser,
  getCategoryById,
  getInvoices,
  getInvoiceById,
  getInvoiceByUser,
} from "../controllers/adminGet.js";

const router = express.Router();

router.get("/users", getUsers);
// router.get("/user/:id", getUserById);
router.get("/products", getProducts);
router.get("/products-user/:id", getProductsByUser);
router.get("/product/:id", getProductById);
router.get("/categories", getCategories);
router.get("/categories-user/:id", getCategoriesByUser);
router.get("/category/:id", getCategoryById);
router.get("/invoices", getInvoices);
router.get("/invoice/:id", getInvoiceById);
router.get("/invoices-user/:id", getInvoiceByUser);

export default router;
