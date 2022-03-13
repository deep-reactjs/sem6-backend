import mongoose from "mongoose";
const { Schema } = mongoose;

const InvoiceSchema = mongoose.Schema({
  dueDate: Date,
  currency: String,
  items: [
    { itemName: String, unitPrice: String, quantity: String, discount: String },
  ],
  rates: String,
  vat: Number,
  total: Number,
  subTotal: Number,
  notes: String,
  status: String,
  invoiceNumber: String,
  type: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  totalAmountReceived: Number,
  client: { name: String, email: String, phone: String, address: String },
  paymentRecords: [
    {
      amountPaid: Number,
      datePaid: Date,
      paymentMethod: String,
      note: String,
      paidBy: String,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);
export default InvoiceModel;
