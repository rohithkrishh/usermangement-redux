const User = require("../models/userModel");

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.send(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch {
    res.status(500).json({ message: "server error" });
  }
};

const updateProfile = async (req, res) => {
  console.log("in update profile ===>>", req.body);
  try {
    const { username, email, phone } = req.body;

    // Find user by ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare the update object based on the incoming data
    const updateData = {
      username: username || user.username,
      email: email || user.email,
      phone: phone || user.phone,
    };

    // For update the file path 
    if (req.file) {          
      console.log("Upload file:", req.file);
      updateData.profileImage = "/uploads/" + req.file.filename;
    }

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    console.log(updatedUser);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("userToken");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  userProfile,
  updateProfile,
  logoutUser,
};
