const userData = require("../models/userDataModel");

const userPostdata = async (req, res) => {
  console.log(req.body);
  const { name, email, age } = req.body; //data we get from frontend
  try {
    
    const userAdded = await userData.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded); //response send to frontend
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }); //error if we dont receive data from frontend
  }
};

const getusersData = async (req, res) => {
  try {
    const allUsers = await userData.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET SINGLE USER
const getSingleuserData = async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await userData.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE USER

const deleteUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserData = async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);
  //const { name, email, age } = req.body;
  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userPostdata,
  getusersData,
  getSingleuserData,
  deleteUserData,
  updateUserData,
};
