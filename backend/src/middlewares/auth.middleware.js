const dishifyPartnerModel=require("../models/dishify.model");
const userModel=require("../models/user.models")

const  jwt=require("jsonwebtoken");

async function authdishifyPartnerMiddleware(req,res,next) {
    

    const token =req.cookies.token;

    if(!token){
    return  res.status(401).json({
            message:"please login first "
        })
    }

try{

 const decoded=jwt.verify(token, process.env.JWT_SECRET)

 const dishifyPartner=await dishifyPartnerModel.findById(decoded.id);


 req.dishifyPartner = dishifyPartner

next()

}catch(err){
    return res.status(401).json({
        message:"Invalid token"

    })

}



}









async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    // Important: verify the user still exists in MongoDB
    if (!user) {
      return res.status(401).json({
        message: "User not found. Please log in again.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("User authentication error:", err.message);

    return res.status(401).json({
      message: "Invalid token or authentication failed",
    });
  }
}






module.exports={
    authdishifyPartnerMiddleware,
    authUserMiddleware
}



