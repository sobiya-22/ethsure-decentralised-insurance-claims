import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, guys!');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at PORT:${PORT}`);
});
