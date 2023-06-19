import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import Newsroute from "./routes/newsRoutes.js";
import router from "./routes/contactUsRoutes.js";
import serviceRoutes from "./routes/servicesRoutes.js";
import routerDashboard from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const PORT = process.env.PORT;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/service", serviceRoutes);
app.use(cors());
app.use("/news", Newsroute);
app.use("/contact", router);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("API is running ...");
});
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

// routes
app.use("/dashboard", routerDashboard);

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);

//handling invalid requests
app.use("*", (req, res) => {
  res.status(400).send({
    status: 400,
    error: true,
    message: "Please enter a valid request!",
  });
});
//error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});
app.use(function (req, res, next) {
  next(createError(404));
});
