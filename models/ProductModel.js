import express from 'express'
import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
    name: String,
    category: String,
    subCategory: String,
    brand: String,
    price: String,
    imgUrl: String,
    userId: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ProductModel = mongoose.model('ProductModel', ProductSchema)
export default ProductModel