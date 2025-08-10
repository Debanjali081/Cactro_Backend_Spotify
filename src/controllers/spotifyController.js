import { spotifyApi } from "../utils/spotifyApi.js";
import { getAccessToken } from "./authController.js";

export async function playTrack(req, res) {
  const { uri } = req.body;

  try {
    const api = spotifyApi(getAccessToken());

    // 1️⃣ Get the active device
    const devicesRes = await api.get("/me/player/devices");
    const activeDevice = devicesRes.data.devices.find(d => d.is_active);

    if (!activeDevice) {
      return res.status(400).json({ error: "No active device found. Please open Spotify Web or Mobile." });
    }

    // 2️⃣ Play the song on the active device
    await api.put(`/me/player/play?device_id=${activeDevice.id}`, { uris: [uri] });

    res.json({ message: "Playback started" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function pauseTrack(req, res) {
  try {
    const api = spotifyApi(getAccessToken());

    // 1️⃣ Get the active device
    const devicesRes = await api.get("/me/player/devices");
    const activeDevice = devicesRes.data.devices.find(d => d.is_active);

    if (!activeDevice) {
      return res.status(400).json({ error: "No active device found. Please open Spotify Web or Mobile." });
    }

    // 2️⃣ Pause playback on that device
    await api.put(`/me/player/pause?device_id=${activeDevice.id}`);

    res.json({ message: "Playback stopped" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
