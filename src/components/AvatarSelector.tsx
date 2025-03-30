import { Label } from "@radix-ui/react-label";

import { Avatar, SAMPLE_AVATARS } from "@/lib/constants/avatars";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface AvatarSelectorProps {
  selectedAvatar: Avatar | undefined;
  handleChangeAvatar: (avatarId: string) => void;
}

export default function AvatarSelector({
  selectedAvatar,
  handleChangeAvatar,
}: AvatarSelectorProps) {
  return (
    <RadioGroup
      value={selectedAvatar?.id}
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      onValueChange={handleChangeAvatar}
    >
      {SAMPLE_AVATARS.map((avatar) => (
        <Card
          key={avatar.id}
          className={cn(
            "p-0 cursor-pointer transition-all group relative",
            selectedAvatar?.id === avatar.id && "ring-2 ring-primary",
          )}
          onClick={() => handleChangeAvatar(avatar.id)}
        >
          <CardContent className="p-2">
            <div className="flex flex-col items-center p-2">
              <div className="relative">
                {/* Static image that hides on hover */}
                <picture className="block group-hover:hidden">
                  <source srcSet={avatar.previewImageUrl} type="image/webp" />
                  <img
                    src={avatar.previewImageUrl}
                    alt={avatar.name}
                    className="mb-2 rounded-md object-cover"
                  />
                </picture>
                {/* Video that shows on hover */}
                <video
                  src={avatar.previewVideoUrl}
                  loop
                  muted
                  poster={avatar.previewImageUrl}
                  autoPlay
                  playsInline
                  className="hidden mb-2 rounded-md object-cover group-hover:block"
                />
              </div>
              <div className="flex max-w-full items-center space-x-2">
                <RadioGroupItem id={avatar.id} value={avatar.id} />
                <Label htmlFor={avatar.id} className="truncate">
                  {avatar.name}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </RadioGroup>
  );
}
