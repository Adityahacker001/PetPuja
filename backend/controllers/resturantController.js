import restaurantModel from "../models/resturantModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator" 


const loginRestaurant = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await restaurantModel.findOne({ email });

        if (!user) {
            return res.json({success:false,message:"User Don't Exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = createTokens(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
 

const createTokens = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerRestaruant = async (req, res) => {
    const { name, password, email,restaurantName,city,country,deliveryPrice,estimatedDeliveryTime } = req.body;
    try {
        const exist = await restaurantModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message:"Please enter a valid email"});
        }

        if (password.length < 9) {
            return res.json({ success: false, message:"Please enter a valid password"});
        }


        const salt = await bcrypt.genSalt(9)
        const hashespassword = await bcrypt.hash(password, salt);
        const newUser = new restaurantModel({
            name: name,
            email: email,
            password: hashespassword,
            restaurantName: restaurantName,
            city:city,
            country:country,
            deliveryPrice:deliveryPrice,
            estimatedDeliveryTime : estimatedDeliveryTime
        })

        const user = await newUser.save();
        const token = createTokens(user._id)
        res.json({ success: true, token });


    } catch (err) {
        console.log(err);
        res.json({success: false, message:"Error"})
    } 
}
const getAdmin = async (req, res) => {
    try {
        let userData = await restaurantModel.findOne({ _id: req.body.userId });
        var emailData = await userData.email;
        res.json({ success: true, emailData}); 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const listAdmin = async (req, res) => {
    try {
        const Data = await restaurantModel.find({});
        res.json({success:true,data:Data})
    } catch (error) {
        console.log(error); 
        res.json({success:false,messgae:"Error"})
    }
}
const updateUser = async (req, res) => {
    const {name, restaurantName, city, country, deliveryPrice, estimatedDeliveryTime } = req.body;
    try {
        await restaurantModel.updateOne({ _id: req.body.userId }, {
            $set: {
                name: name,
                restaurantName: restaurantName,
                city:city,
                country:country,
                deliveryPrice:deliveryPrice,
                estimatedDeliveryTime : estimatedDeliveryTime
            }
        })
        return res.json({success:true,messgae:"Done"})
    } catch (error) {
        console.log(error); 
        res.json({success:false,messgae:"Error"})
    }
}

export {loginRestaurant, registerRestaruant,getAdmin,listAdmin,updateUser}