import express from 'express'
import mongoose from 'mongoose'
const { Schema } = mongoose;

const ClientSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    status: Boolean, // active: true, deactive: false
    userId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ClientModel = mongoose.model('Client', ClientSchema)
export default ClientModel