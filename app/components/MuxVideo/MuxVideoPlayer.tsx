import React from "react";
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";

interface MuxVideoThumbnailProps extends Omit<MuxPlayerProps, "controls"> {
  playbackId?: string;
  videoTitle?: string;
  autoPlay?: boolean;
  muted?: boolean;
  startTime?: number;
  controls?: boolean;
}

const MuxVideoThumbnail: React.FC<MuxVideoThumbnailProps> = ({
  playbackId,
  videoTitle,
  autoPlay = true,
  muted = true,
  startTime = 15,
  controls,
  ...rest
}) => {
  return (
    <MuxPlayer
      src={`https://stream.mux.com/${playbackId}/high.mp4`}
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay={autoPlay}
      loop
      muted={muted}
      startTime={startTime}
      placeholder="" // Add an empty string as a placeholder
      {...rest}
    />
  );
};

export default MuxVideoThumbnail;
