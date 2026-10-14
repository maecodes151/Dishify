const userModel=require('../models/user.models');
const DishifyModel=require("../models/dishify.model")
const foodPartnerModel=require("../models/fooditem.model")
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

async function registerUser(req,res){
const {fullname,email,password}=req.body;

const isUserAlreadyExist=await userModel.findOne({
    email
})

if(isUserAlreadyExist){
    return res.status(400).json({
        message:"user already exists"
    })
}
const hashedPassword = await bcrypt.hash(password,10)


    const user=await userModel.create({
        fullname,
        email,
        password:hashedPassword
    })


    const  token=jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)


    res.cookie("token",token ,{
        
  httpOnly: true,
    secure: false,
    sameSite: "lax"


    })

    res.status(201).json({
    message:"User registered successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullname:user.fullname
    }

    })
}

 

async function loginUser(req,res){

    const {email,password}=req.body;

const user=await userModel.findOne({
    email
})

if(!user){
 return   res.status(400).json({
        message:"Invalid email or password"
    })
}

const ispasswordValid= await bcrypt.compare(password, user.password);

if(!ispasswordValid){
  return  res.status(400).json({
        message:"Invalid email or password"
    })
}
const  token=jwt.sign({
    id:user._id,
},process.env.JWT_SECRET)

res.cookie("token",token)

res.status(200).json({
message:"user logged in successfully",
user:{
    _id:user._id,  
    email:user.email,
    fullname:user.fullname
}

});

} 






async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}




async function registerDishifyPartner(req,res){
    const {name,email,password, phone, Address, contactName }=req.body;

    const isAccountAlreadyExists=await DishifyModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food Partner account already exists"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const DishifyPartner=await DishifyModel.create({
   name,
   email,
   password:hashedPassword,
    phone,
    Address,
    contactName
})


    const token =jwt.sign({
        id:DishifyPartner._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)


    res.status(201).json({
     message:"Dishify partner registered successfully",
       DishifyPartner:{
        _id:DishifyPartner._id,
        email:DishifyPartner.email,
        name:DishifyPartner.name,
        phone:DishifyPartner.phone,
        Address:DishifyPartner.Address,
        contactName:DishifyPartner.contactName
       }
    })

}






async function loginDishifyPartner(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const dishifyPartner = await DishifyModel.findOne({
      email: email.trim(),
    });

    if (!dishifyPartner) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      dishifyPartner.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from environment variables");
    }

    const token = jwt.sign(
      { id: dishifyPartner._id },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Dishify Partner login successfully",
      DishifyPartner: {
        _id: dishifyPartner._id,
        email: dishifyPartner.email,
        name: dishifyPartner.name,
      },
    });
  } catch (error) {
    console.error("Dishify Partner login error:", error);

    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
}








function logoutDishifyPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "food partner logged out successfully"
    })
}



module.exports={
    registerUser,
    loginUser,
    logoutUser,
   
   registerDishifyPartner,
   loginDishifyPartner,
   logoutDishifyPartner,
}