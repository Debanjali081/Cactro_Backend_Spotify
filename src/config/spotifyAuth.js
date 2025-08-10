import axios from "axios";
import querystring from "querystring";

export async function getTokens(code, redirectUri, clientId, clientSecret) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
      }
    }
  );
  return response.data;
}
