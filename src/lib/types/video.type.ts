import { VideoStatus } from "./video-status.type";

export type Video = {
  id: string;
  avatarId: string;
  voiceId: string;
  script: string;
  status: VideoStatus;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
};
