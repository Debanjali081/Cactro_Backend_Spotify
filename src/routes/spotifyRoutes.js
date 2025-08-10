import express from "express";
import { getSpotifyData, playTrack, pauseTrack } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/", getSpotifyData);
router.put("/play", playTrack);
router.put("/pause", pauseTrack);

export default router;
