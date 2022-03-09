import express from 'express'
import {getSubCategories, createSubCategory, updateSubCategory, deleteSubCategory, getSubCategoriesByUser} from '../controllers/subcategories.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/', getSubCategories)
router.get('/user',auth, getSubCategoriesByUser);
router.post('/', createSubCategory)
router.patch('/:id', updateSubCategory)
router.delete('/:id', deleteSubCategory)

export default router