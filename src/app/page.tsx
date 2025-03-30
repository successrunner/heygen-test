"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import AvatarSelector from "@/components/AvatarSelector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import VideoSubmissionTable from "@/components/VideoSubmissionTable";
import { useCreateAvatarVideo } from "@/hooks/useCreateAvatarVideo";
import { useVideoSubmissions } from "@/hooks/useVideoSubmissions";
import { Avatar, SAMPLE_AVATARS } from "@/lib/constants/avatars";
import { supabase } from "@/lib/supabase/client";

const queryClient = new QueryClient();

export default function Home() {
  const [script, setScript] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | undefined>(
    undefined,
  );

  const { isLoading, videoSubmissions } = useVideoSubmissions();
  const {
    mutate: createAvatarVideo,
    result: createAvatarVideoResult,
    isError: isErrorCreatingAvatarVideo,
    isSuccess: isSuccessCreatingAvatarVideo,
    isLoading: isCreatingAvatarVideo,
  } = useCreateAvatarVideo();

  const handleGenerate = async () => {
    createAvatarVideo({
      avatarId: selectedAvatar?.id,
      voiceId: selectedAvatar?.voiceId,
      inputText: script,
    });
  };

  const handleChangeAvatar = (id: string) => {
    const avatar = SAMPLE_AVATARS.find((a) => a.id === id);
    if (avatar) {
      setSelectedAvatar(avatar);
    }
  };

  const handleInsertAvatarVideo = async (videoId: string) => {
    try {
      await supabase.from("avatar_videos").insert({
        id: videoId,
        avatar_id: selectedAvatar?.id,
        voice_id: selectedAvatar?.voiceId,
        script: script,
        status: "waiting",
        video_url: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isErrorCreatingAvatarVideo) {
      toast.error("Error generating avatar video");
    }
  }, [isErrorCreatingAvatarVideo]);

  useEffect(() => {
    if (isSuccessCreatingAvatarVideo) {
      toast.success("Avatar video generation started successfully");

      setScript("");
      setSelectedAvatar(undefined);

      handleInsertAvatarVideo(createAvatarVideoResult.data.video_id);
    }
  }, [
    script,
    selectedAvatar,
    createAvatarVideoResult,
    isSuccessCreatingAvatarVideo,
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Avatar Video Generator
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">
                1. Select an Avatar
              </h2>
              <AvatarSelector
                selectedAvatar={selectedAvatar}
                handleChangeAvatar={handleChangeAvatar}
              />
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">
                2. Enter Your Script
              </h2>
              <Textarea
                value={script}
                className="min-h-[150px]"
                placeholder="Enter the text you want the avatar to speak..."
                onChange={(e) => setScript(e.target.value)}
              />
            </div>

            <Button
              disabled={
                isCreatingAvatarVideo || !selectedAvatar || !script.trim()
              }
              className="w-full"
              onClick={handleGenerate}
            >
              {isCreatingAvatarVideo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Video...
                </>
              ) : (
                "Generate Video"
              )}
            </Button>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">
              3. Your Generated Video
            </h2>
            <VideoSubmissionTable
              isLoading={isLoading}
              videoSubmissions={videoSubmissions}
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
