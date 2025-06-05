// import mongoose from "mongoose";

// const restaurantSchema = new mongoose.Schema({
//   name: { type: String, require: true },
//   password: { type: String, require: true },
//   email:{type:String,require:true,unique:true},
//   restaurantName: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
//   deliveryPrice: { type: Number, required: true },
//   estimatedDeliveryTime: { type: Number, required: true },
//   imageUrl: { type: String, required: true },
//   lastUpdated: { type: Date, required: true },
// });

// const resturantModel = mongoose.models.order || mongoose.model("resturantuser", restaurantSchema)
// export default resturantModel

import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    restaurantName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    password: { type: String, require: true },
    date: { type: Date, default: Date.now() },
    
}, { minimize: false })

const restaurantModel = mongoose.model.user || mongoose.model("admin", restaurantSchema);
export default restaurantModel;
