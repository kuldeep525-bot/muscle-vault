import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./src/routes/user.routes.js";
import memberRoute from "./src/routes/member.routes.js";
import planRoute from "./src/routes/plan.routes.js";
import paymentRoute from "./src/routes/payment.routes.js";
import inquiryRoute from "./src/routes/inquiry.route.js";
import dashboardRoute from "./src/routes/dashboard.route.js";
import dbConnection from "./src/config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

//  CORS FIRST (IMPORTANT)
app.use(
  cors({
    // origin: "http://localhost:",
    origin: "https://muscle-vault-phi.vercel.app",
    credentials: true,
  }),
);

// global middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend");
});

// routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/member", memberRoute);
app.use("/api/v1/plan", planRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/inquiry", inquiryRoute);
app.use("/api/v1/dashboard", dashboardRoute);

const startServer = async () => {
  await dbConnection();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
