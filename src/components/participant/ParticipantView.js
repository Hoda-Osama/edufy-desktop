
import React, { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import RecordRTC, { RecordRTCPromisesHandler, invokeSaveAsDialog } from "recordrtc";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
const RECORD_INTERVAL = 120000; // 2 minutes
const RECORD_DURATION = 10000; // 10 seconds
const ParticipantView = ({ participantId, setDisableMicBtn, setDisableCamBtn, setDisableShareBtn }) => {
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


    const periodicStreamRecorder = async () => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(async function (stream) {
            let recorder = RecordRTC(stream, {
                type: 'video',
                mimeType: 'video/webm;codecs=vp9',
            });
            recorder.startRecording();

            const sleep = m => new Promise(r => setTimeout(r, m));
            await sleep(RECORD_DURATION);

            recorder.stopRecording(() => {
                //   let blob = recorder.getBlob(); // recorded video file
                //   invokeSaveAsDialog(blob); // download the file locally 

            });
        });

    }


    useEffect(() => {

        const interval = setInterval(() => {
            if (webcamOn) {
                periodicStreamRecorder();
            }

        }, RECORD_INTERVAL);

        return () => clearInterval(interval);
    }, [webcamOn])
    useEffect(() => {
        if (webcamRef.current) {
            setDisableCamBtn(false);
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
    }, [webcamStream, webcamOn, setDisableCamBtn]);
    useEffect(() => {
        if (micRef.current) {
            setDisableMicBtn(false);
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
    }, [micStream, micOn, setDisableMicBtn]);

    useEffect(() => {
        if (screenShareRef.current) {
            setDisableShareBtn(false)
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
    }, [screenShareStream, screenShareOn, setDisableShareBtn]);

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