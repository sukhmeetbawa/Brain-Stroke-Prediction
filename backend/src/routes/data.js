import express from "express";
import { DataModel } from "../models/Data.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new DataModel({
    userID: req.body.userID,
    gender: req.body.gender,
    age: req.body.age,
    strokeStatus: req.body.strokeStatus,
  });
  console.log(user);
  try {
    //await user.save();
    DataModel.insertMany(user)
      .then(function () {
        console.log("Successfully saved defult items to DB");
      })
      .catch(function (err) {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

// Route to get all data from the schema and return number of users with stroke
router.get("/", async (req, res) => {
  try {
    const data = await DataModel.find({});
    const strokeCount = data.filter((user) => user.strokeStatus).length;
    const noStrokeCount = data.length - strokeCount;
    const maleWithStroke = data.filter(
      (user) => user.gender === "Male" && user.strokeStatus
    ).length;
    const femaleWithStroke = data.filter(
      (user) => user.gender === "Female" && user.strokeStatus
    ).length;
    return res.status(200).json({
      strokeCount,
      noStrokeCount,
      maleWithStroke,
      femaleWithStroke,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { router as dataRouter };
