import { Router } from 'express'
import { authRouter } from './auth'
import { userRouter } from './user'
import { recommendRouter } from './recommend'
const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/recommend', recommendRouter)

export default router
