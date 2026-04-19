"use client";

import { useEffect, useState } from "react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isPlaying: false });
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, []);

  const Wrapper = data.songUrl ? "a" : "div";
  const wrapperProps = data.songUrl
    ? { href: data.songUrl, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative inline-flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-fg/3"
      style={{
        cursor: data.songUrl ? "pointer" : "default",
        background: "linear-gradient(to right, transparent, rgba(var(--fg-rgb),0.05), transparent)",
        borderBottom: "1px solid rgba(var(--fg-rgb),0.04)",
      }}
    >
      {/* Album art or equalizer */}
      {data.isPlaying && data.albumArt ? (
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.albumArt}
            alt=""
            className="w-9 h-9 rounded group-hover:opacity-90 transition-opacity duration-300"
            style={{
              opacity: 0.75,
              filter: "brightness(1.15)",
              boxShadow: "0 4px 12px rgba(var(--shadow-rgb),0.4)",
            }}
          />
          <span className="absolute bottom-0.5 right-0.5 flex items-end gap-px h-3.5">
            <span className="spotify-bar w-0.75 rounded-full" style={{ animationDelay: "0s" }} />
            <span className="spotify-bar w-0.75 rounded-full" style={{ animationDelay: "0.15s" }} />
            <span className="spotify-bar w-0.75 rounded-full" style={{ animationDelay: "0.3s" }} />
          </span>
        </div>
      ) : (
        <span className="flex items-end gap-0.5 h-3 shrink-0 opacity-30">
          <span className="w-0.5 h-1.5 bg-fg/40 rounded-full" />
          <span className="w-0.5 h-2.5 bg-fg/40 rounded-full" />
          <span className="w-0.5 h-1 bg-fg/40 rounded-full" />
        </span>
      )}

      {/* Text */}
      <div className="flex flex-col min-w-0">
        {data.isPlaying && data.title ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] text-fg/75 group-hover:text-fg/90 transition-colors duration-300 truncate max-w-48 leading-tight font-medium">
              {data.title}
            </span>
            <span className="text-[10px] text-fg/40 truncate max-w-48 leading-tight">
              {data.artist}
            </span>
          </div>
        ) : (
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-fg/30 leading-tight">
            Offline
          </span>
        )}
      </div>
    </Wrapper>
  );
}
