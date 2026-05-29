// Music API Service - Pixabay & Jamendo

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  audioUrl: string;
  imageUrl?: string;
  genre?: string;
  source: "pixabay" | "jamendo";
}

// Pixabay Music API
// Docs: https://pixabay.com/api/docs/
const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY || "";
const PIXABAY_MUSIC_URL = "https://pixabay.com/api/";

export async function searchPixabayMusic(query: string = "wedding", page: number = 1): Promise<MusicTrack[]> {
  if (!PIXABAY_API_KEY) {
    console.warn("Pixabay API key not configured");
    return [];
  }

  try {
    const params = new URLSearchParams({
      key: PIXABAY_API_KEY,
      q: query,
      audio_type: "music",
      per_page: "20",
      page: page.toString(),
    });

    const response = await fetch(`${PIXABAY_MUSIC_URL}?${params}`);
    if (!response.ok) throw new Error("Pixabay API error");

    const data = await response.json();
    
    return (data.hits || []).map((hit: any) => ({
      id: `pixabay-${hit.id}`,
      title: hit.tags || "Untitled",
      artist: hit.user || "Unknown Artist",
      duration: hit.duration || 0,
      audioUrl: hit.audio || "",
      imageUrl: hit.userImageURL,
      genre: hit.tags?.split(",")[0] || "Music",
      source: "pixabay" as const,
    }));
  } catch (error) {
    console.error("Pixabay Music error:", error);
    return [];
  }
}

// Jamendo API
// Docs: https://developer.jamendo.com/v3.0
const JAMENDO_CLIENT_ID = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID || "";
const JAMENDO_API_URL = "https://api.jamendo.com/v3.0";

export async function searchJamendoMusic(query: string, limit: number = 20): Promise<MusicTrack[]> {
  if (!JAMENDO_CLIENT_ID) {
    console.warn("Jamendo API client ID not configured");
    return [];
  }

  try {
    const params = new URLSearchParams({
      client_id: JAMENDO_CLIENT_ID,
      format: "json",
      limit: limit.toString(),
      search: query,
      audioformat: "mp32", // MP3 128kbps
      include: "musicinfo",
    });

    const response = await fetch(`${JAMENDO_API_URL}/tracks/?${params}`);
    if (!response.ok) throw new Error("Jamendo API error");

    const data = await response.json();
    
    return (data.results || []).map((track: any) => ({
      id: `jamendo-${track.id}`,
      title: track.name || "Untitled",
      artist: track.artist_name || "Unknown Artist",
      duration: track.duration || 0,
      audioUrl: track.audio || track.audiodownload || "",
      imageUrl: track.image || track.album_image,
      genre: track.musicinfo?.tags?.genres?.[0] || "Music",
      source: "jamendo" as const,
    }));
  } catch (error) {
    console.error("Jamendo Music error:", error);
    return [];
  }
}

// Combined search
export async function searchMusic(query: string): Promise<MusicTrack[]> {
  const [pixabayResults, jamendoResults] = await Promise.all([
    searchPixabayMusic(query),
    searchJamendoMusic(query),
  ]);

  // Combine and sort by relevance (Jamendo first as it's more reliable)
  return [...jamendoResults, ...pixabayResults];
}

// Get curated wedding playlist
export async function getWeddingPlaylist(): Promise<MusicTrack[]> {
  const queries = ["wedding", "romantic", "love", "ceremony"];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  return searchMusic(randomQuery);
}
