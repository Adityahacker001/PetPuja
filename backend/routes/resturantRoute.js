import express from "express"
import { getAdmin, listAdmin, loginRestaurant, registerRestaruant, updateUser } from "../controllers/resturantController.js"
import authMiddleware from "../middleware/auth.js"


const restaurantRouter = express.Router()

restaurantRouter.post('/register', registerRestaruant)
restaurantRouter.post('/login', loginRestaurant)
restaurantRouter.get('/listadmin', listAdmin)
restaurantRouter.post('/getadmin',authMiddleware, getAdmin)
restaurantRouter.post('/updateuser',authMiddleware, updateUser)

export default restaurantRouter