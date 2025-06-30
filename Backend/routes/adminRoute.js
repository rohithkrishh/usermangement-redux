const express = require("express");
const adminRoute = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuth");
const adminController = require("../controllers/adminController");

adminRoute.post("/login", adminAuthMiddleware.adminAuth);
adminRoute.get(
  "/home",
  adminAuthMiddleware.adminVerify,
  adminController.getHome
);
adminRoute.post(
  "/adduser",
  adminAuthMiddleware.adminVerify,
  adminController.addUser
);
adminRoute.put(
  "/edit/:id",
  adminAuthMiddleware.adminVerify,
  adminController.editUser
);
adminRoute.get(
  "/dashboard",
  adminAuthMiddleware.adminVerify,
  adminController.showUser
);
adminRoute.delete("/deleteUser/:id", adminController.deleteUser);
adminRoute.post("/logout", adminController.logoutLoad);

module.exports = adminRoute;
