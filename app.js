const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./dbConfig/db");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const app = express();

const port = process.env.PORT;
dbConnect();


app.use(cookieParser());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", noteRouter);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
