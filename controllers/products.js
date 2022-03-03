import express from 'express'
import mongoose from 'mongoose'

import ProductModel from '../models/ProductModel.js'


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


export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const product = await ProductModel.findById(id);
        
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getProducts = async (req, res) => {
    const { page, perPage } = req.query;
    
    try {
        const LIMIT = Number(perPage) || 10;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await ProductModel.countDocuments({});
        const products = await ProductModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: products, total: total, currentPage: Number(page), recordsPerPage: LIMIT, numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {

    const product = req.body

    const newProduct = new ProductModel({...product, createdAt: new Date().toISOString() })

    try {
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updateProduct = async (req, res) => {
    const { id: _id } = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No product with that id')

    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, {...product, _id}, { new: true})

    res.json(updatedProduct)
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Product with that id')

    await ProductModel.findByIdAndRemove(id)

    res.json({message: 'Product deleted successfully'})
}


export const getProductsByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const products = await ProductModel.find({ userId: req.userId });

        res.json({ data: products });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

