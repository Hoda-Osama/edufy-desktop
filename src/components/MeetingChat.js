import React, { useState } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import MessageList from "./MessageList";
const borderRadius = 8;
const MeetingChat = () => {
    const { publish, messages } = usePubSub("CHAT", {});
    const [message, setMessage] = useState("");
    return (
        <div style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflowY: "hidden",
        }}>
            <MessageList messages={messages} />
            <div style={{
                position: "absolute", bottom: 20, display: "flex",
                paddingInline: "5%",
                width: "100%",

            }}>


                <input
                    style={{
                        width: "100%",
                        borderRadius: borderRadius,
                        border: "2px solid #ccc",
                    }}
                    value={message}
                    onChange={(e) => {
                        const v = e.target.value;
                        setMessage(v);
                    }}
                />
                <Button
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                        const m = message;

                        if (m.length) {
                            publish(m, { persist: true });
                            setMessage("");
                        }
                    }}
                    variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>

            </div>

        </div>
    );
};

export default MeetingChat