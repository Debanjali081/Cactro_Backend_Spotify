import { spotifyApi } from "../utils/spotifyApi.js";
import { getAccessToken } from "./authController.js";

export async function getSpotifyData(req, res) {
  try {
    const api = spotifyApi(getAccessToken());
    const [topTracks, nowPlaying, followedArtists] = await Promise.all([
      api.get("/me/top/tracks?limit=10"),
      api.get("/me/player/currently-playing"),
      api.get("/me/following?type=artist")
    ]);

    res.json({
      top_tracks: topTracks.data.items.map(track => ({
        name: track.name,
        artist: track.artists.map(a => a.name).join(", "),
        uri: track.uri
      })),
      now_playing: nowPlaying.data?.item
        ? {
            name: nowPlaying.data.item.name,
            artist: nowPlaying.data.item.artists.map(a => a.name).join(", ")
          }
        : "Nothing is playing",
      followed_artists: followedArtists.data.artists.items.map(a => a.name)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function playTrack(req, res) {
  const { uri } = req.body; // ✅ body instead of query
  try {
    await spotifyApi(getAccessToken()).put("/me/player/play", { uris: [uri] });
    res.json({ message: "Playback started" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function pauseTrack(req, res) {
  try {
    // First check if there is an active device
    const devicesRes = await spotifyApi(getAccessToken()).get("/me/player/devices");
    const activeDevice = devicesRes.data.devices.find(d => d.is_active);

    if (!activeDevice) {
      return res.status(400).json({ error: "No active device found. Open Spotify and start playing on a device first." });
    }

    await spotifyApi(getAccessToken()).put("/me/player/pause");
    res.json({ message: "Playback stopped" });
  } catch (err) {
    console.error("Pause error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
}

