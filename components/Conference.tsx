import { useEffect, useState } from "react";
import { connect, LocalDataTrack, RemoteParticipant, Room } from "twilio-video";

import Participant from "./Participant";

const Conference: React.FC = () => {
  const [room, setRoom] = useState<Room | undefined>();
  const [remoteParticipants, setRemoteParticipants] = useState<
    RemoteParticipant[]
  >([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/auth");
      const { token } = await response.json();
      const room = await connect(token, {
        name: "test room2",
        audio: true,
        video: true,
      });

      setRoom(room);
      setRemoteParticipants(Array.from(room.participants.values()));

      room.on("participantConnected", (participant) =>
        setRemoteParticipants((remoteParticipants) => [
          ...remoteParticipants,
          participant,
        ])
      );
      room.on("participantDisconnected", (participant) =>
        setRemoteParticipants((remoteParticipants) =>
          remoteParticipants.filter((p) => p.identity !== participant.identity)
        )
      );

      window.addEventListener("beforeunload", () => {
        room.disconnect();
      });
    })();
  }, []);

  if (!room) {
    return <div>loading...</div>;
  }

  return (
    <div className="room">
      <div className="participants">
        <Participant
          key={room.localParticipant.identity}
          local
          participant={room.localParticipant}
        />
        {remoteParticipants.map((participant) => (
          <Participant key={participant.identity} participant={participant} />
        ))}
      </div>
    </div>
  );
};

export default Conference;
