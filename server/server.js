const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const budgetRouter = require("./routes/budgets.js");
const userRouter = require("./routes/user.js");
const expenseRouter = require("./routes/expenses.js");

// express app
dotenv.config();
const app = express();
app.use(cors(corsOptions));

//midldleware
app.use(express.json());
app.use((res, req, next) => {
  next();
});

// routes
app.use("/api/budgets", budgetRouter);
app.use("/api/user", userRouter);
app.use("/api/expenses", expenseRouter);

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
