import React from "react";
import MuxVideo from "@mux/mux-video-react";
import "./muxvideo.scss";

interface MuxVideoPlayerProps {
  playbackId?: string;
  videoTitle?: string;
  autoPlay?: boolean;
  muted?: boolean;
  startTime?: number;
}

const MuxVideoPlayer: React.FC<MuxVideoPlayerProps> = ({
  playbackId,
  videoTitle,
  autoPlay = true,
  muted = true,
  startTime = 15,
}) => {
  return (
    <div className="video-container">
      <MuxVideo
        playbackId={playbackId}
        streamType="on-demand"
        controls={false}
        autoPlay={autoPlay}
        loop
        muted={muted}
        startTime={startTime}
        placeholder="" // Add an empty string as a placeholder
      />
    </div>
  );
};

export default MuxVideoPlayer;
