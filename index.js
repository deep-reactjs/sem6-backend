import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import pdf from "html-pdf";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { imageFilter } from "./helpers.js";
import multer from "multer";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import invoiceRoutes from "./routes/invoices.js";
import clientRoutes from "./routes/clients.js";
import userRoutes from "./routes/userRoutes.js";
import profile from "./routes/profile.js";
import pdfTemplate from "./documents/index.js";
import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/Category.js";
import subcategoryRoutes from "./routes/SubCategory.js";
import adminRoutes from "./routes/admin.js";
// import invoiceTemplate from './documents/invoice.js'
import emailTemplate from "./documents/email.js";
const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use("/invoices", invoiceRoutes);
app.use("/clients", clientRoutes);
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/profiles", profile);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
app.post(
  "/upload-product-image",
  multer({ storage: storage, fileFilter: imageFilter }).single("file"),
  (req, res, next) => {
    const file = req.file;
    if (res.err) {
      return res.status(400).send({ message: "Not a valid type image" });
    }
    if (!file) {
      return res.status(400).send({ message: "Please upload a file." });
    }
    return res.send({ message: "File uploaded successfully.", file });
  }
);
app.post(
  "/upload-profile-image",
  multer({ storage: storage, fileFilter: imageFilter }).single("file"),
  (req, res, next) => {
    const file = req.file;
    if (res.err) {
      return res.status(400).send({ message: "Not a valid type image" });
    }
    if (!file) {
      return res.status(400).send({ message: "Please upload a file." });
    }
    return res.send({ message: "File uploaded successfully.", file });
  }
);

var options = { format: "A4" };
app.post("/send-pdf", (req, res) => {
  const { email, company } = req.body;

  pdf.create(pdfTemplate(req.body), options).toFile("invoice.pdf", (err) => {
    transporter
      .sendMail({
        from: `${
          company.businessName ? company.businessName : company.name
        } <deepsoni704625@gmail.com>`,
        to: `${email}`,
        replyTo: `${company.email}`,
        subject: `Invoice from ${
          company.businessName ? company.businessName : company.name
        }`,
        text: `Invoice from ${
          company.businessName ? company.businessName : company.name
        }`,
        html: emailTemplate(req.body),
        attachments: [
          {
            filename: "invoice.pdf",
            path: `${__dirname}/invoice.pdf`,
          },
        ],
      })
      .then((info) => {
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
      });

    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("invoice.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
