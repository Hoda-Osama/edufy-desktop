import { Box, Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import useResponsiveSize from "../utils/useResponsiveSize";
import UserContext from "../UserContext";
import Grid from '@mui/material/Grid';
export function StudentJoiningScreen({ onClickJoin }) {
    const { instructorIdentifier, setInstructorIdentifier } = useContext(UserContext);
    const [meetingId, setMeetingId] = useState("");
    const [meetingIdError, setMeetingIdError] = useState(false);
    const padding = useResponsiveSize({
        xl: 6,
        lg: 6,
        md: 6,
        sm: 4,
        xs: 1.5,
    });
    const handleSubmit = () => {
        if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
            onClickJoin(meetingId);
        else setMeetingIdError(true);
    }
    return (
        <Grid container spacing={3} style={{
            width: "60%",
            margin: "auto",
        }}>
            <Grid item xs={12} style={{
                display: "flex",
                justifyContent: "center",

            }}>
                <TextField
                    autoComplete="given-name"
                    color="primary"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Instructor's Identifier"
                    autoFocus
                    variant="outlined"
                    onChange={(e) => {
                        setInstructorIdentifier(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12} style={{
                display: "flex",
                justifyContent: "center",

            }}>
                <TextField

                    style={{
                        marginTop: "1rem",
                        width: "100%",
                    }}
                    required
                    id="outlined"
                    label="Meeting ID"
                    helperText={
                        meetingIdError
                            ? "Meeting id is not valid"
                            : "Enter your meeting id Here"
                    }
                    onChange={(e) => {
                        setMeetingId(e.target.value);
                    }}
                    error={meetingIdError}
                    variant="outlined"
                    defaultValue={meetingId}

                />
            </Grid>
            <Grid item xs={12} style={{
                display: "flex",
                justifyContent: "center",

            }}>

                <Button
                    disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}") || instructorIdentifier.length === 0}
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    id={"btnJoin"}>
                    Join
                </Button>
            </Grid>
        </Grid>

    );
}
