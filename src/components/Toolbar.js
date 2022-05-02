import React, { useEffect, useState } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import Grid from '@mui/material/Grid';



const Toolbar = ({ participantId }) => {

    const {
        leave,
        toggleMic,
        toggleWebcam,
        toggleScreenShare,

    } = useMeeting();
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
    return (
        <Box
            style={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "#161B22",
                paddingTop: "10px",
                paddingBottom: "10px",
            }}
        >
            <div style={{
                width: "90%",
                margin: "0 auto",
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4} style={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Button onClick={toggleMic} color="inherit">
                            {micOn ? <MicIcon style={{ color: 'white' }} /> : <MicOffIcon style={{ color: 'white' }} />}
                        </Button>
                        <Button onClick={toggleWebcam} color="inherit">
                            {webcamOn ? <VideocamIcon style={{ color: 'white' }} /> : <VideocamOffIcon style={{ color: 'white' }} />}
                        </Button>
                        <Button onClick={toggleScreenShare} color="inherit">
                            {screenShareOn ? <ScreenShareIcon style={{ color: 'white' }} /> : <StopScreenShareIcon style={{ color: 'white' }} />}
                        </Button>
                    </Grid>
                    <Grid item xs={4} style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>

                        <Button onClick={leave} variant="contained" color="error">LEAVE</Button>
                    </Grid>

                </Grid>
            </div>


        </Box >
    )
}

export default Toolbar;