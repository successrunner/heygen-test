import { Download, Play } from "lucide-react";

import { SAMPLE_AVATARS } from "@/lib/constants/avatars";
import { Video } from "@/lib/types/video.type";
import { formatDate } from "@/lib/utils";

import StatusBadge from "./StatusBadge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function VideoSubmissionTable({
  isLoading,
  videoSubmissions,
}: {
  isLoading: boolean;
  videoSubmissions: Video[];
}) {
  const getAvatarName = (avatarId: string) => {
    return SAMPLE_AVATARS.find((avatar) => avatar.id === avatarId)?.name;
  };

  const handleDownload = async (video: Video) => {
    try {
      const response = await fetch(video.videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `video-${video.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Script</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : videoSubmissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No videos generated yet. Select an avatar and enter a script to
                get started.
              </TableCell>
            </TableRow>
          ) : (
            videoSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="max-w-[150px] truncate">
                  {getAvatarName(submission.avatarId)}
                </TableCell>
                <TableCell className="max-w-[150px] truncate">
                  {submission.script}
                </TableCell>
                <TableCell>
                  <StatusBadge status={submission.status} />
                </TableCell>
                <TableCell>{formatDate(submission.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {submission.status === "completed" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              // onClick={() => setSelectedVideo(submission)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Play
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-5xl sm:w-2/3">
                            <DialogHeader>
                              <DialogTitle>Video Preview</DialogTitle>
                            </DialogHeader>
                            <div className="aspect-video mt-2">
                              <video
                                src={submission.videoUrl}
                                controls
                                className="w-full h-full"
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="default"
                          variant="outline"
                          onClick={() => handleDownload(submission)}
                        >
                          <Download className="h-5 w-5 mr-2" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
