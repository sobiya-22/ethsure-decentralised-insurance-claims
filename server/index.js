import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import customerRoutes from "./routes/customer.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/users", userRoutes);

app.get("/api/start" , (req , res) => {
    return res.status(200).send({
        message : "Server Started",
        success : true
    })
})


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at PORT:${PORT}`);
});
