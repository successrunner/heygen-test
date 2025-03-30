import { Loader2 } from "lucide-react";

import { BadgeVariant } from "@/lib/types/badge-variant.type";
import { VideoStatus } from "@/lib/types/video-status.type";

import { Badge } from "./ui/badge";

export default function StatusBadge({ status }: { status: VideoStatus }) {
  const statusConfig = {
    pending: { variant: "secondary", label: "Pending" },
    processing: { variant: "default", label: "Processing" },
    waiting: { variant: "outline", label: "Waiting" },
    failed: { variant: "destructive", label: "Failed" },
    completed: { variant: "secondary", label: "Completed" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant as BadgeVariant}>
      {status === "processing" && (
        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
      )}
      {config.label}
    </Badge>
  );
}
