import express from 'express'
import mongoose from 'mongoose'

import SubCategoryModel from '../models/SubCategoryModel.js'


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


export const getSubCategory = async (req, res) => { 
    const { id } = req.params;

    try {
        const subCategory = await SubCategoryModel.findById(id);
        
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getSubCategories = async (req, res) => {
    const { page, perPage } = req.query;
    
    try {
        const LIMIT = Number(perPage) || 10;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await SubCategoryModel.countDocuments({});
        const subCategories = await SubCategoryModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: subCategories, total: total, currentPage: Number(page), recordsPerPage: LIMIT, numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createSubCategory = async (req, res) => {

    const subCategory = req.body

    const newSubCategory = new SubCategoryModel({...subCategory, createdAt: new Date().toISOString() })

    try {
        await newSubCategory.save()
        res.status(201).json(newSubCategory)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updateSubCategory = async (req, res) => {
    const { id: _id } = req.params
    const subCategory = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No sub-category with that id')

    const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {...subCategory, _id}, { new: true})

    res.json(updatedSubCategory)
}


export const deleteSubCategory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No sub-category with that id')

    await SubCategoryModel.findByIdAndRemove(id)

    res.json({message: 'Sub-Category deleted successfully'})
}


export const getSubCategoriesByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const subCategories = await SubCategoryModel.find({ userId: req.userId });

        res.json({ data: subCategories });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

