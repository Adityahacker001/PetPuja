import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    image:{type:String,require:true},
    category: { type: String, require: true },
})

const foodModle=mongoose.models.food || mongoose.model("food",foodSchema);
export default foodModle;