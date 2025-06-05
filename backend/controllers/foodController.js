import foodModle from "../models/foodModel.js";
import fs from 'fs'
import restaurantModel from "../models/resturantModel.js";

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModle({
        userId:req.body.userId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (err) {
        console.log(err)
        res.json({success:false,message:"Error"})
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModle.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error); 
        res.json({success:false,messgae:"Error"})
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModle.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModle.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood}