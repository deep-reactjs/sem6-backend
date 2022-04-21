import express from "express";
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  getInvoicesByUser,
} from "../controllers/invoices.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", getInvoice);
// router.get('/creator', getInvoicesByUser);
router.get("/", auth, getInvoicesByUser);
router.post("/", createInvoice);
router.patch("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);

export default router;
