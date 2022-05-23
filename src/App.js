/*eslint-disable*/
import React, { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { getToken } from "./api";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { JoiningScreen } from "./components/JoiningScreen";
import MeetingView from "./components/MeetingView";
import { UserProvider } from "./UserContext";
const App = () => {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [isMeetingStarted, setMeetingStarted] = useState(false);

  return (
    <UserProvider>
      {

        isMeetingStarted ? (
          <div style={{
            backgroundColor: '#0D1117',
            height: '100vh',

          }}>

            <MeetingProvider

              config={{
                meetingId,
                micEnabled: micOn,
                webcamEnabled: webcamOn,
                name: participantName ? participantName : "TestUser",
              }}
              token={token}
              reinitialiseMeetingOnConfigChange={true}
              joinWithoutUserInteraction={true}
            >
              <MeetingView
                onNewMeetingIdToken={({ meetingId, token }) => {
                  setMeetingId(meetingId);
                  setToken(token);
                }}
                onMeetingLeave={() => {
                  setToken("");
                  setMeetingId("");
                  setWebcamOn(false);
                  setMicOn(false);
                  setMeetingStarted(false);
                }}
                onMeetingEnd={() => {
                  setWebcamOn(false);
                  setMicOn(false);
                  setMeetingStarted(false);
                }}
              />
            </MeetingProvider>
          </div>
        ) : (
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            meetinId={meetingId}
            setMeetingId={setMeetingId}
            setToken={setToken}
            setMicOn={setMicOn}
            micOn={micOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
          />
        )
      }

    </UserProvider>
  )
};

export default App;
