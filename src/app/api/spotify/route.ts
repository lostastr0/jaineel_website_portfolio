export const dynamic = "force-dynamic";
export const revalidate = 0;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(
      `Failed to refresh Spotify access token: ${JSON.stringify(data)}`
    );
  }

  return data.access_token;
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return Response.json({
      ok: false,
      reason: "missing_env",
      hasClientId: !!CLIENT_ID,
      hasClientSecret: !!CLIENT_SECRET,
      hasRefreshToken: !!REFRESH_TOKEN,
    });
  }

  try {
    const accessToken = await getAccessToken();

    const res = await fetch(NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (res.status === 204) {
      return Response.json({
        ok: true,
        status: 204,
        isPlaying: false,
        reason: "spotify_returned_204_no_content",
      });
    }

    const text = await res.text();

    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    return Response.json({
      ok: res.ok,
      status: res.status,
      is_playing: data?.is_playing ?? false,
      has_item: !!data?.item,
      item_name: data?.item?.name ?? null,
      artist:
        data?.item?.artists?.map((a: { name: string }) => a.name).join(", ") ??
        null,
      device: data?.device
        ? {
            name: data.device.name,
            type: data.device.type,
            is_active: data.device.is_active,
            is_private_session: data.device.is_private_session,
            is_restricted: data.device.is_restricted,
          }
        : null,
      debug: data,
    });
  } catch (error) {
    return Response.json({
      ok: false,
      reason: "exception",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}