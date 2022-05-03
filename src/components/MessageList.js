import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
const MessageList = ({ messages }) => {
    const { localParticipant } = useMeeting();
    return (
        <div style={{
            height: "90%",
            overflowY: "scroll",

        }}>
            {messages?.map((message, i) => {
                const { senderName, message: text, timestamp, senderId } = message;

                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: localParticipant.id === senderId ? "row-reverse" : "row",
                            marginBottom: "10px",
                        }}
                        key={i}
                    >

                        <div
                            style={{
                                marginLeft: 8,
                                marginRight: 8,
                                paddingLeft: 4,
                                paddingRight: 4,
                                display: "flex",
                                alignItems: localParticipant.id === senderId ? "end" : "start",
                                flexDirection: "column",
                            }}

                        >

                            <p style={{ margin: 0, padding: 0 }}>
                                {localParticipant.id === senderId ? 'you' : senderName}
                                <span
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        opacity: 0.6,
                                        fontSize: "12px",
                                        marginLeft: "10px",

                                    }}
                                >
                                    {formatAMPM(new Date(timestamp))}
                                </span>
                            </p>

                            <p style={{
                                backgroundColor: "#DFF0FF", padding: 8, borderRadius: 8,
                                margin: 0, marginTop: 4, width: "fit-content",
                                maxWidth: "40ch",
                                textOverflow: 'ellipsis'
                            }}>{text}</p>



                        </div>
                    </div>

                );
            })}
        </div>
    );
};
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
}
export default MessageList;