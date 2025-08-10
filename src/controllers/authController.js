import querystring from "querystring";
import { getTokens } from "../config/spotifyAuth.js";

let access_token = "";
let refresh_token = "";

export function login(req, res) {
  const scope = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-top-read",
    "user-follow-read",
    "user-read-currently-playing"
  ].join(" ");

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
      })
  );
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

    // Redirect directly to /spotify after successful login
    res.redirect("/spotify");
  } catch (err) {
    res.status(500).json(err.response?.data || { error: "Authentication failed" });
  }
}


export function getAccessToken() {
  return access_token;
}
