import { useEffect, useRef } from "react";
import { VideoTrack } from "twilio-video";

const Track: React.FC<{ track: VideoTrack }> = ({ track }) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const child = track.attach();
    ref.current.classList.add(track.kind);
    ref.current.appendChild(child);
  }, []);

  return <div ref={ref}></div>;
};

export default Track;
