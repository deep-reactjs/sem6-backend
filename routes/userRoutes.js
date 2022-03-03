import express from 'express'
import { signin, signup, forgotPassword, resetPassword, getUsers } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);
router.get('/users', getUsers);

export default router