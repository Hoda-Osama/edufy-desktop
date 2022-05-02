
import React, { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import RecordRTC, { RecordRTCPromisesHandler, invokeSaveAsDialog } from "recordrtc";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const width = 200;;

const ParticipantView = ({ participantId }) => {
    const webcamRef = useRef(null);
    const micRef = useRef(null);
    const screenShareRef = useRef(null);


    const {
        displayName,
        participant,
        webcamStream,
        micStream,
        screenShareStream,
        webcamOn,
        micOn,
        screenShareOn,
        isLocal,
        isActiveSpeaker,
        isMainParticipant,
        switchTo,
        pinState,
        setQuality,
        enableMic,
        disableMic,
        enableWebcam,
        disableWebcam,
        pin,
        unpin,
    } = useParticipant(participantId);


    // const periodicStreamRecorder = async () => {
    //   navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: false
    //   }).then(async function (stream) {
    //     let recorder = RecordRTC(stream, {
    //       type: 'video',
    //       mimeType: 'video/webm;codecs=vp9',
    //     });
    //     recorder.startRecording();

    //     const sleep = m => new Promise(r => setTimeout(r, m));
    //     await sleep(10000);

    //     recorder.stopRecording(() => {
    //       let blob = recorder.getBlob();
    //       invokeSaveAsDialog(blob);

    //     });
    //   });

    // }
    // const MINUTE_MS = 5000;

    // useEffect(() => {
    //   if (webcamOn) {
    //     periodicStreamRecorder();
    //   }
    //   // const interval = setInterval(() => {
    //   //   console.log('Logs every minute');

    //   // }, MINUTE_MS);

    //   // return () => clearInterval(interval);
    // }, [webcamOn])
    useEffect(() => {
        if (webcamRef.current) {
            if (webcamOn) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(webcamStream.track);

                webcamRef.current.srcObject = mediaStream;
                webcamRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                webcamRef.current.srcObject = null;
            }
        }
    }, [webcamStream, webcamOn]);
    useEffect(() => {
        if (micRef.current) {
            if (micOn) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    useEffect(() => {
        if (screenShareRef.current) {
            if (screenShareOn) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(screenShareStream.track);

                screenShareRef.current.srcObject = mediaStream;
                screenShareRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                screenShareRef.current.srcObject = null;
            }
        }
    }, [screenShareStream, screenShareOn]);

    return (
        <div
            style={{

                borderRadius: 8,
                overflow: "hidden",
                margin: 8,
                padding: 8,
                display: "flex",
                flex: 1,
                flexDirection: "column",
                position: "relative",
            }}
        >
            <audio ref={micRef} autoPlay muted={isLocal} />
            {
                screenShareOn ? (
                    <div
                        style={{
                            marginTop: 8,
                            position: "relative",
                            borderRadius: 8,
                            overflow: "hidden",
                            backgroundColor: "lightgreen",
                            width: "100%",
                            height: 300,
                        }}
                    >
                        <div
                            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                        >
                            <video
                                height={"100%"}
                                width={"100%"}
                                ref={screenShareRef}
                                style={{
                                    backgroundColor: "black",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    objectFit: "contain",
                                }}
                                autoPlay
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                }}
                            >
                                <p
                                    style={{
                                        color: screenShareOn ? "green" : "red",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        opacity: 1,
                                    }}
                                >
                                    SCREEN SHARING
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            position: "relative",
                            borderRadius: 8,
                            overflow: "hidden",
                            backgroundColor: "black",
                            width: "100%",
                            height: 300,
                        }}
                    >
                        <div
                            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                        >
                            {webcamOn ? (<video
                                height={"100%"}
                                width={"100%"}
                                ref={webcamRef}
                                style={{
                                    backgroundColor: "black",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    objectFit: "contain",
                                }}
                                autoPlay
                            />) : (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                }}>
                                    <span style={{
                                        fontSize: 35,
                                        fontWeight: "bold",
                                        color: "white",
                                    }}>
                                        {displayName}
                                        {isLocal ? " (You)" : ""}
                                    </span>
                                </div>

                            )}

                            <div
                                style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                }}
                            >

                                {micOn ? <MicIcon style={{ color: 'white' }} /> : <MicOffIcon style={{ color: 'white' }} />}
                            </div>

                            {webcamOn ? (<div
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    left: 10,
                                }}
                            >
                                <span style={{
                                    color: "white",
                                }}>
                                    {displayName}
                                    {isLocal ? " (You)" : ""}
                                </span>
                            </div>) : (<></>)}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ParticipantView