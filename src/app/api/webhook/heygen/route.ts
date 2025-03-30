import crypto from "crypto";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    // Secret key received from HeyGen for verifying the request
    const whSecret = process.env.NEXT_PUBLIC_HEYGEN_WEBHOOK_SECRET || "";

    // Extracting the content of the request
    const content = await request.json();
    console.log(content);

    // Extracting the signature from the request headers
    const signature = request.headers.get("signature");

    // Calculating the HMAC of the content with the secret key
    const hmac = crypto.createHmac("sha256", whSecret);
    hmac.update(JSON.stringify(content), "utf-8");
    const computedSignature = hmac.digest("hex");

    // Checking if the computed signature matches the received signature
    if (computedSignature !== signature) {
      throw new Error("Invalid request");
    }

    // Processing the event data from the request JSON
    const { event_type: eventType, event_data: eventData } = content;

    // Update the video status in Supabase
    try {
      if (eventType === "avatar_video.success") {
        await supabase
          .from("avatar_videos")
          .update({
            status: "completed",
            video_url: eventData.url,
          })
          .eq("id", eventData.video_id);
      } else if (eventType === "avatar_video.fail") {
        await supabase
          .from("avatar_videos")
          .update({
            status: "failed",
          })
          .eq("id", eventData.video_id);
      }
    } catch (error) {
      console.error("Error updating video status:", error);
      return NextResponse.json(
        { error: "Failed to update video status" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
