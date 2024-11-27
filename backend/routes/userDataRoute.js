const express = require("express");
const router = express.Router();
const {
  userPostdata,
  getusersData,
  getSingleuserData,
  deleteUserData,
  updateUserData,
} = require("../controller/usercontroller.js");

//CREATE
router.post("/create", userPostdata);

//READ (Get All User)
router.get("/read", getusersData);

//READ (Get Single User)
router.get("/read/:id", getSingleuserData);

//DELETE
router.delete("/delete/:id", deleteUserData);

//UPDATE
router.patch("/edit/:id", updateUserData);

module.exports = router;
