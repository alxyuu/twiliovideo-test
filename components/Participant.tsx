import { useEffect, useState } from "react";
import {
  Participant as TwilioParticipant,
  VideoTrack,
  VideoTrackPublication,
} from "twilio-video";
import Track from "./Track";

const Participant: React.FC<{
  participant: TwilioParticipant;
  local?: boolean;
}> = ({ participant, local }) => {
  const [tracks, setTracks] = useState<VideoTrack[]>([]);

  useEffect(() => {
    const existingPublications = Array.from(participant.tracks.values());
    const existingTracks = existingPublications.map(
      (publication: VideoTrackPublication) => publication.track
    );
    const nonNullTracks = existingTracks.filter((track) => track !== null);

    setTracks(nonNullTracks);
  }, []);

  useEffect(() => {
    if (!local) {
      participant.on("trackSubscribed", (track) =>
        setTracks([...tracks, track])
      );
    }
  }, []);

  console.log(tracks.map((track) => track.name));
  return (
    <div className="participant" id={participant.identity}>
      <div className="identity">{participant.identity}</div>
      {tracks.map((track) => (
        <Track key={track.name} track={track} />
      ))}
    </div>
  );
};

export default Participant;
