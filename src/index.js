import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";

dotenv.config();
const app = express();

const PORT=process.env.PORT

app.use(express.json());


// Routes
app.use("/", authRoutes);
app.use("/spotify", spotifyRoutes);

app.listen(PORT, () => console.log("Server running on port 3001"));
