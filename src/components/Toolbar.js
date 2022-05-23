import React, { useContext, useState } from "react";
import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import Grid from '@mui/material/Grid';
import UserContext from "../UserContext";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Toolbar = ({ participantId, disableMicBtn, disableCamBtn, disableShareBtn }) => {
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {
        leave,
        end,
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
                        {/* <Button onClick={toggleScreenShare} color="inherit">
                            {screenShareOn ? <ScreenShareIcon style={{ color: 'white' }} /> : <StopScreenShareIcon style={{ color: 'white' }} />}
                        </Button> */}
                    </Grid>
                    <Grid item xs={4} style={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>
                        {
                            user ? (
                                <>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        variant="contained"
                                        color="error"
                                    >
                                        LEAVE
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => {
                                            handleClose()
                                            end()
                                            leave()
                                        }}>END</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleClose()
                                            leave()
                                        }}>LEAVE</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button onClick={leave} variant="contained" color="error">LEAVE</Button>
                            )



                        }
                    </Grid>

                </Grid>
            </div>


        </Box >
    )
}

export default Toolbar;