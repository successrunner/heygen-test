import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Video } from "./types/video.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToVideo(data: any): Video {
  return {
    id: data.id,
    avatarId: data.avatar_id,
    voiceId: data.voice_id,
    script: data.script,
    status: data.status,
    videoUrl: data.video_url,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}
