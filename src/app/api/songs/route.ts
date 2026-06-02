import { NextRequest, NextResponse } from "next/server";

const PIXABAY_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
const JAMENDO_CLIENT = process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID;

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "wedding instrumental";
    const limit = 20;

    // Fetch from Pixabay Audio API
    const pixabayPromise = PIXABAY_KEY
      ? fetch(
          `https://pixabay.com/api/audio/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&per_page=${limit}`,
        ).then((r) => r.json())
      : Promise.resolve({ hits: [] });

    // Fetch from Jamendo
    const jamendoPromise = JAMENDO_CLIENT
      ? fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT}&format=json&limit=${limit}&tags=wedding+romantic&include=musicinfo&audio=duration,download`,
        ).then((r) => r.json())
      : Promise.resolve({ results: [] });

    const [pixabayRes, jamendoRes] = await Promise.allSettled([
      pixabayPromise,
      jamendoPromise,
    ]);

    const songs: any[] = [];

    // Parse Pixabay results
    if (pixabayRes.status === "fulfilled" && pixabayRes.value?.hits) {
      for (const hit of pixabayRes.value.hits) {
        songs.push({
          id: `pixabay-${hit.id}`,
          title: hit.tags?.split(",")[0]?.trim() || "Untitled",
          artist: "Pixabay",
          audioUrl: hit.audio_url || hit.url,
          coverUrl: hit.userImageURL || "",
          duration: hit.duration || 0,
          source: "pixabay",
        });
      }
    }

    // Parse Jamendo results
    if (jamendoRes.status === "fulfilled" && jamendoRes.value?.results) {
      for (const track of jamendoRes.value.results) {
        songs.push({
          id: `jamendo-${track.id}`,
          title: track.name,
          artist: track.artist_name,
          audioUrl: track.audio,
          coverUrl: track.image || track.album_image || "",
          duration: track.duration || 0,
          source: "jamendo",
        });
      }
    }

    return NextResponse.json(songs);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
