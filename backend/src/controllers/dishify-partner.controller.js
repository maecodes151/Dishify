const dishyPartnerModel = require("../models/dishify.model");
const foodItemModel = require("../models/fooditem.model");

async function getDishifyPartnerById(req, res) {
  const dishifyPartnerId = req.params.id;

  const dishifyPartner = await dishyPartnerModel.findById(dishifyPartnerId);
  const foodItemByDishifyPartner = await foodItemModel.find({
    dishifyPartner: dishifyPartnerId,
  });

  if (!dishifyPartner) {
    return res.status(404).json({ message: "Dishify Partner not found" });
  }

  res.status(200).json({
    message: "Dishify Partner fetched successfully",
    dishifyPartner:{
      ...dishifyPartner.toObject(),
      foodItems:foodItemByDishifyPartner
    }
    
  });
}
module.exports = {
  getDishifyPartnerById,
};
