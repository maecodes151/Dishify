
const fooditemModel = require("../models/fooditem.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.Model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );

  const dishifyFooditem = await fooditemModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    dishifyPartner: req.dishifyPartner._id,
  });

  res.status(201).json({
    message: "food created successfully",
    food: dishifyFooditem,
  });
}

async function getFoodItems(req, res) {
  const DishifyItems = await fooditemModel.find({});
  res.status(200).json({
    message: "food items fetched successfully",
    DishifyItems,
  });
}


async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({
        message: "Food ID is required",
      });
    }

    const isAlreadyLike = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadyLike) {
      await likeModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      const updatedFood = await fooditemModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: -1 } },
        { new: true }
      );

      return res.status(200).json({
        message: "Food unliked",
        like: false,
        likeCount: updatedFood?.likeCount ?? 0,
      });
    }




    await likeModel.create({
      user: user._id,
      food: foodId,
    });

    const updatedFood = await fooditemModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    return res.status(200).json({
      message: "Food liked",
      like: true,
      likeCount: updatedFood?.likeCount ?? 0,
    });
  } catch (error) {
    console.error("Like error:", error);

    return res.status(500).json({
      message: "Failed to update like",
      error: error.message,
    });
  }
}



async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId || !user) {
      return res.status(400).json({
        message: "Food ID and logged-in user are required",
      });
    }

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
      });

 

      return res.status(200).json({
        message: "Food unsaved",
        saved: false,
      });
    }

    const save = await saveModel.create({
      user: user._id,
      food: foodId,
    });

  

    return res.status(201).json({
      message: "Food saved",
      saved: true,
      save,
    });
  } catch (error) {
    console.error("Save food error:", error);

    return res.status(500).json({
      message: "Failed to save food",
      error: error.message,
    });
  }
}




async function getSaveFood(req, res) {
  try {
    const user = req.user;

    // Check that the middleware provided a valid user
    if (!user || !user._id) {
      return res.status(401).json({
        message: "User not found. Please log in again.",
      });
    }

    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food");

    // Return an empty array if the user has no saved foods
    return res.status(200).json({
      message: "Saved foods retrieved successfully",
      savedFoods,
    });
  } catch (error) {
    console.error("Get saved food error:", error);

    return res.status(500).json({
      message: "Failed to retrieve saved foods",
      error: error.message,
    });
  }
}








module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood
};
