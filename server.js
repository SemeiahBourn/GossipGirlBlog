const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const mongoConfig = require("./config/mongoConfig");
const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ messgae: "Welcome Fellow Gossipers" });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  mongoConfig();
});
