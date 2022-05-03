
import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import Grid from '@mui/material/Grid';

const ParticipantsView = ({ setDisableMicBtn, setDisableCamBtn, setDisableShareBtn }) => {
    const { participants } = useMeeting();

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                padding: 8,
            }}
        >
            {/* {chunk([...participants.keys()]).map((k) => (
                <div style={{ display: "flex" }}>
                    {k.map((l) => (
                        <ParticipantView key={l} participantId={l} />
                    ))}
                </div>
            ))} */}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {chunk([...participants.keys()]).map((k) => (
                    k.map((l) => (
                        <Grid item xs={2} sm={4} md={4} key={l} >
                            <ParticipantView key={l} participantId={l}
                                setDisableMicBtn={setDisableMicBtn}
                                setDisableCamBtn={setDisableCamBtn}
                                setDisableShareBtn={setDisableShareBtn}
                            />
                        </Grid>
                    ))
                ))}
            </Grid>
        </div>
    );
};
const chunk = (arr) => {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 3));
    return newArr;
};

export default ParticipantsView;