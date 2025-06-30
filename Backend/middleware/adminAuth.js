const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { model } = require("mongoose");

const adminAuth = async () => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin || !admin.isAdmin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.json({ admin });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const adminVerify = async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided.Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded.adminId);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  adminAuth,
  adminVerify,
};
