
import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantsView from "./participant/ParticipantsView";
import MeetingChat from "./MeetingChat";
import Toolbar from "./Toolbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';

import { styled, useTheme } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 450;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        backgroundColor: '#0D1117',
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));




const MeetingView = ({ onMeetingLeave }) => {
    const [disableMicBtn, setDisableMicBtn] = useState(true);
    const [disableCamBtn, setDisableCamBtn] = useState(true);
    const [disableShareBtn, setDisableShareBtn] = useState(true);
    function onMeetingLeft() {
        console.log("onMeetingLeft");
        onMeetingLeave();
    }
    const {
        meetingId,
        localParticipant,
        leave,
        end,
        toggleMic,
        //
        disableWebcam,
        enableWebcam,
        toggleWebcam,
        //
        toggleScreenShare,
        //
        getMics,
        getWebcams,
        changeWebcam,
        changeMic,
    } = useMeeting({ onMeetingLeft });
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={disableCamBtn}
            >
                <span style={{
                    marginRight: "10px",
                    fontSize: "26px",
                }}>Joining Meeting</span>
                <CircularProgress color="inherit" />
            </Backdrop>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <MuiToolbar style={{ backgroundColor: '#161B22' }}>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="span">
                        Meeting ID : {meetingId}
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }) }}
                    >
                        <CommentIcon />
                    </IconButton>
                </MuiToolbar>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
                <ParticipantsView
                    setDisableMicBtn={setDisableMicBtn}
                    setDisableCamBtn={setDisableCamBtn}
                    setDisableShareBtn={setDisableShareBtn}

                />

                {
                    localParticipant ? (<Toolbar participantId={localParticipant.id} />) : (<></>)
                }

            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{
                    marginBottom: theme.spacing(2),
                }} />
                <MeetingChat />

            </Drawer>

        </Box>
    );
}



export default MeetingView