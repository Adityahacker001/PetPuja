import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url'
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import restaurantRouter from "./routes/resturantRoute.js"

// ✅ Handle __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize app first!
const app = express()
const port = process.env.PORT || 4000

// ✅ Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ✅ Middleware
app.use(express.json())
app.use(cors())

// ✅ DB connection
connectDB()

// ✅ Routes
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))  // optional: remove if already covered above
app.use("/api/user", userRouter)
app.use("/api/admin", restaurantRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
  res.send("API Working")
})

// ✅ Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`)
})
