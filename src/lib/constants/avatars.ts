export type Avatar = {
  id: string;
  name: string;
  gender: string;
  voiceId: string;
  previewImageUrl: string;
  previewVideoUrl: string;
};

export const SAMPLE_AVATARS: Avatar[] = [
  {
    id: "Gala_sitting_casualsofawithipad_front",
    name: "Gala Casual Sofa with iPad Front",
    gender: "female",
    voiceId: "35b75145af9041b298c720f23375f578",
    previewImageUrl:
      "https://files2.heygen.ai/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_target.webp",
    previewVideoUrl:
      "https://files2.heygen.ai/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_video_target.mp4",
  },
  {
    id: "Conrad_sitting_sofa_front",
    name: "Conrad Sofa Front",
    gender: "male",
    voiceId: "5403a745860347beb7d342e07eef33fb",
    previewImageUrl:
      "https://files2.heygen.ai/avatar/v3/e45585843830421496f598bf27e00dee_37140/preview_target.webp",
    previewVideoUrl:
      "https://files2.heygen.ai/avatar/v3/e45585843830421496f598bf27e00dee_37140/preview_video_target.mp4",
  },
  {
    id: "Jocelyn_sitting_sofa_front",
    name: "Jocelyn Sofa Front",
    gender: "female",
    voiceId: "7194df66c861492fb6cc379e99905e22",
    previewImageUrl:
      "https://files2.heygen.ai/avatar/v3/3019184debd34a2e8206c441cad2289d_36670/preview_target.webp",
    previewVideoUrl:
      "https://files2.heygen.ai/avatar/v3/3019184debd34a2e8206c441cad2289d_36670/preview_video_target.mp4",
  },
];
