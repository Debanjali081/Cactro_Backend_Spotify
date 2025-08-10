import querystring from "querystring";
import { getTokens } from "../config/spotifyAuth.js";

let access_token = "";
let refresh_token = "";

export async function callback(req, res) {
  const code = req.query.code || null;
  try {
    const tokens = await getTokens(
      code,
      process.env.SPOTIFY_REDIRECT_URI,
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET
    );
    access_token = tokens.access_token;
    refresh_token = tokens.refresh_token;

    // Redirect directly to /spotify after successful login
    res.redirect("/spotify");
  } catch (err) {
    res.status(500).json(err.response?.data || { error: "Authentication failed" });
  }
}


export async function callback(req, res) {
  const code = req.query.code || null;
  try {
    const tokens = await getTokens(
      code,
      process.env.SPOTIFY_REDIRECT_URI,
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET
    );
    access_token = tokens.access_token;
    refresh_token = tokens.refresh_token;

    res.send("Spotify Auth Successful! You can now access /spotify endpoint.");
  } catch (err) {
    res.status(500).json(err.response.data);
  }
}

export function getAccessToken() {
  return access_token;
}
