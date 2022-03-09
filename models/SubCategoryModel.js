import mongoose from 'mongoose'
const { Schema } = mongoose;

const SubCategorySchema = mongoose.Schema({
    name: String,
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const CategoryModel = mongoose.model('SubCategory', SubCategorySchema)
export default CategoryModel