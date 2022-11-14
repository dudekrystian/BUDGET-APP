const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const budgetRouter = require("./routes/budgets.js");

// express app
dotenv.config();
const app = express();

//midldleware
app.use(express.json());
app.use((res, req, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/budgets", budgetRouter);

// connect with db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("---connect with DB---");
    // listening
    app.listen(process.env.PORT, () => {
      console.log(`---listening on port: ${process.env.PORT}---`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
