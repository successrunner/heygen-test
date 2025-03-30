import { AxiosError } from "axios";

import { CREATE_AVATAR_VIDEO } from "@/lib/constants/apis";
import apiManager from "@/lib/helpers/api.manager";

export interface CreateAvatarVideoApiPayload {
  avatarId?: string;
  voiceId?: string;
  inputText?: string;
}

export interface CreateAvatarVideoApiResponse {
  data: {
    video_id: string;
  };
}

const createAvatarVideo = async (
  payload: CreateAvatarVideoApiPayload,
): Promise<CreateAvatarVideoApiResponse> => {
  try {
    const response = await apiManager.post(
      CREATE_AVATAR_VIDEO,
      {
        caption: false,
        dimension: { width: 1280, height: 720 },
        video_inputs: [
          {
            character: {
              type: "avatar",
              avatar_id: payload.avatarId,
            },
            voice: {
              type: "text",
              voice_id: payload.voiceId,
              input_text: payload.inputText,
            },
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (response.status !== 200) {
      const error = response as unknown as AxiosError;
      return Promise.reject(error.response?.data);
    }

    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export default createAvatarVideo;
