import express from "express";
import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = mongoose.Schema({
  name: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
