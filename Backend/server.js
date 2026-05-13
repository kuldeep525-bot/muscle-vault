import express from "express";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.routes.js";
import memberRoute from "./src/routes/member.routes.js";
dotenv.config();

import dbConnection from "./src/config/db.js";

const app = express();

const port = process.env.PORT || 9000;

//global middleware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend");
});

//routes connected

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/member", memberRoute);

const startServer = async () => {
  await dbConnection();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
