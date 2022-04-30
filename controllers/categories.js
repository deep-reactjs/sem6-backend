import express from "express";
import mongoose from "mongoose";
import SubCategoryModel from "../models/SubCategoryModel.js";
import CategoryModel from "../models/CategoryModel.js";
// export const getClients = async (req, res) => {
//     const userId = req.body

//     try {
//         const allClients = await ClientModel.find({userId: userId}).sort({_id:-1})
//         //find({}).sort({_id:-1}) to sort according to date of creation

//         res.status(200).json(allClients)

//     } catch (error) {
//         res.status(409).json(error.message)

//     }

// }

export const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  const { page, perPage } = req.query;
  const { userId } = req;
  try {
    const LIMIT = Number(perPage) || 10;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await CategoryModel.countDocuments({});
    var categories =
      req.role == "admin"
        ? await CategoryModel.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex)
        : await CategoryModel.find({ userId: userId })
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

export const createCategory = async (req, res) => {
  const category = req.body;
  console.log(category);
  const newCategory = new CategoryModel({
    ...category,
    createdAt: new Date().toISOString(),
  });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const updateCategory = async (req, res) => {
  const { id: _id } = req.params;
  const category = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No category with that id");

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    _id,
    { ...category, _id },
    { new: true }
  );

  res.json(updatedCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No category with that id");

  await CategoryModel.findByIdAndRemove(id);

  res.json({ message: "Category deleted successfully" });
};

export const getCategoriesByUser = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const categories = await CategoryModel.find({ userId: req.userId });

    res.json({ data: categories });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
