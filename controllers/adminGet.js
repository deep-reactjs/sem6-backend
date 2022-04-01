import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const SECRET =
  process.env.SECRET || "my-32-character-ultra-secure-and-ultra-long-secret";
const HOST = process.env.SMTP_HOST;
const PORT = process.env.SMTP_PORT;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

import User from "../models/userModel.js";
import InvoiceModel from "../models/InvoiceModel.js";
import ProductModel from "../models/ProductModel.js";
import SubCategoryModel from "../models/SubCategoryModel.js";
import CategoryModel from "../models/CategoryModel.js";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(409).json(err.message);
  }
};
export const getProducts = async (req, res) => {
  const { page, perPage } = req.query;
  const { userId } = req;
  try {
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await ProductModel.countDocuments({});
    var products = await ProductModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: products,
      total: total,
      currentPage: Number(page),
      recordsPerPage: LIMIT,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getProductsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, perPage } = req.query;
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await ProductModel.countDocuments({});
    var products = await ProductModel.find({ userId: id })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: products,
      total: total,
      currentPage: Number(page),
      recordsPerPage: LIMIT,
      numberOfPages: Math.ceil(total / LIMIT),
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(409).json(err.message);
  }
};
export const getCategories = async (req, res) => {
  const { page, perPage } = req.query;
  const { userId } = req;
  try {
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await CategoryModel.countDocuments({});
    var categories = await CategoryModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    var data = [];
    for (let i = 0; i < categories.length; i++) {
      data[i] = {
        category: categories[i],
        subCategories: await SubCategoryModel.find({
          categoryId: categories[i]._id,
        }),
      };
    }
    res.json({
      data: data,
      total: total,
      currentPage: Number(page),
      recordsPerPage: LIMIT,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getCategoriesByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, perPage } = req.query;
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await CategoryModel.countDocuments({});
    var categories = await CategoryModel.find({ userId: id })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    var data = [];
    for (let i = 0; i < categories.length; i++) {
      data[i] = {
        category: categories[i],
        subCategories: await SubCategoryModel.find({
          categoryId: categories[i]._id,
        }),
      };
    }
    res.json({
      data: data,
      total: total,
      currentPage: Number(page),
      recordsPerPage: LIMIT,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(409).json(err.message);
  }
};
export const getInvoiceByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, perPage } = req.query;
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await InvoiceModel.countDocuments({});
    var data = await InvoiceModel.find({ userId: id })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: data,
      total: total,
      currentPage: Number(page),
      recordsPerPage: LIMIT,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(409).json(err.message);
  }
};

export const getInvoices = async (req, res) => {
  const { page, perPage } = req.query;
  try {
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await InvoiceModel.countDocuments({});
    var invoices = await InvoiceModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: invoices,
      total: total,
      currentPage: Number(page),
      recordsPerPage: LIMIT,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    var invoices = await InvoiceModel.find({ _id: id });

    res.json(invoices);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    var categories = await CategoryModel.find({ _id: id });
    res.json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    var product = await ProductModel.find({ _id: id });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
