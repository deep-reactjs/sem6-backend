import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByUser,
} from "../controllers/categories.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getCategories);
router.get("/user", auth, getCategories);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
