import express from 'express'
import mongoose from 'mongoose'
const { Schema } = mongoose;

const ProductSchema = mongoose.Schema({
    name: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    quantity: Number,
    brand: String,
    price: String,
    imgUrl: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ProductModel = mongoose.model('Product', ProductSchema)
export default ProductModel