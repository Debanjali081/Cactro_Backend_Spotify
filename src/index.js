import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";

dotenv.config();
const app = express();

const PORT=process.env.PORT

app.use(express.json());
app.use(cors({
  origin: "https://port-folio-one-page-notion.vercel.app", 
  credentials: true
}));


// Routes
app.use("/", authRoutes);
app.use("/spotify", spotifyRoutes);

app.listen(PORT, () => console.log("Server running on port 3001"));
