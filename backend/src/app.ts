import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import connectToDb from "./db/connect.ToDb";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({    // must be declared before the app is created
  path: path.resolve(__dirname, "../../.env")
});

const app = express();
const PORT = process.env.PORT || 5000;



app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
});