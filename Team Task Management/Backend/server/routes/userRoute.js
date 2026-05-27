import express from "express"
import { signupRoute } from "../controllers/signup.js"
import { loginRoute } from "../controllers/login.js"
import { logoutRoute } from "../controllers/logout.js"
import { refreshTokenRoute } from "../controllers/refreshToken.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { getUser } from "../controllers/getUser.js"
const router=express.Router()


router.post('/api/auth/signup', signupRoute)
router.post('/api/auth/login', loginRoute )
router.post('/api/auth/logout', logoutRoute)
router.post('/api/auth/refreshtoken', refreshTokenRoute)
router.get('/api/auth/getuser', authMiddleware, getUser )

export default router