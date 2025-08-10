import axios from "axios";

export function spotifyApi(accessToken) {
  return axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
