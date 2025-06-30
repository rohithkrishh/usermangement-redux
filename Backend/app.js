require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = requrie("path");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = ["http://locallhost:5173"];

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoute");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

connectDB();

app.use("uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("./admin", adminRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
