import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection.js";
import router from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* CORS — MUST BE FIRST */
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


/* Body parser */
app.use(express.json());

/* Routes */
app.use("/api/auth", router);



app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});
