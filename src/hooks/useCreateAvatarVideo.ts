import { useMutation, UseMutationResult } from "@tanstack/react-query";

import createAvatarVideo, {
  CreateAvatarVideoApiPayload,
  CreateAvatarVideoApiResponse,
} from "@/actions/create-avatar-video";

export interface UseCreateAvatarVideo {
  mutate: (
    data: CreateAvatarVideoApiPayload,
  ) => Promise<CreateAvatarVideoApiResponse>;
  result: CreateAvatarVideoApiResponse;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export const useCreateAvatarVideo = (): UseCreateAvatarVideo => {
  const mutation: UseMutationResult<
    CreateAvatarVideoApiResponse,
    Error,
    CreateAvatarVideoApiPayload
  > = useMutation({
    mutationFn: createAvatarVideo,
  });

  return {
    mutate: mutation.mutateAsync,
    result: mutation.data as CreateAvatarVideoApiResponse,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isPending,
  };
};
