import axios from "axios";

export interface Track {
  id: string;
  title: string;
  artists: string;
  cover: string;
  previewUrl: string | null;
}

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// 🔑 reemplaza por tus credenciales de Spotify Developer Dashboard
const CLIENT_ID = "94dd4d9775e842a9a21edb79960125ae";
const CLIENT_SECRET = "4ed3739fee2940359885cc0f95603a47";

let cachedToken: string | null = null;

// Genera un token temporal de acceso
async function getAccessToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const authString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);


  const response = await axios.post(
    SPOTIFY_TOKEN_URL,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedToken = response.data.access_token;
  // Dura 1 hora
  setTimeout(() => (cachedToken = null), 3500 * 1000);
  return cachedToken!;
}

export async function getPlaylistTracks(playlistId: string): Promise<Track[]> {
  const token = await getAccessToken();

  const url = `${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`;

  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const items = res.data.items || [];

  return items.map((item: any) => {
    const track = item.track;
    return {
      id: track.id,
      title: track.name,
      artists: track.artists.map((a: any) => a.name).join(", "),
      cover: track.album.images?.[0]?.url || "",
      previewUrl: track.preview_url,
    };
  });
}

export async function getTrackDownloadLink(trackId: string): Promise<string> {
  const token = await getAccessToken();
  const url = `${SPOTIFY_API_URL}/tracks/${trackId}`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.preview_url;
}