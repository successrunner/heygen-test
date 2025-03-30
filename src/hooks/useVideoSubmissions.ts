import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import { Video } from "@/lib/types/video.type";
import { convertToVideo } from "@/lib/utils";

export function useVideoSubmissions() {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSubmissions, setVideoSubmissions] = useState<Video[]>([]);

  useEffect(() => {
    // Initial fetch of video submissions
    const fetchVideoSubmissions = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("avatar_videos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching video submissions:", error);
          return;
        }

        setVideoSubmissions(data.map((videoData) => convertToVideo(videoData)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoSubmissions();

    // Set up real-time subscription
    const newChannel = supabase
      .channel("avatar_videos_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "avatar_videos",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setVideoSubmissions((prev) => [
              convertToVideo(payload.new),
              ...prev,
            ]);
          } else if (payload.eventType === "UPDATE") {
            setVideoSubmissions((prev) =>
              prev.map((video) =>
                video.id === payload.new.id
                  ? convertToVideo(payload.new)
                  : video,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setVideoSubmissions((prev) =>
              prev.filter((video) => video.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    setChannel(newChannel);

    // Cleanup subscription on unmount
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  return { isLoading, videoSubmissions };
}
