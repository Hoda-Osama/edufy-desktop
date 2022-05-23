import { Box } from "@material-ui/core";
import Button from '@mui/material/Button';
import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import UserContext from "../UserContext";
import useResponsiveSize from "../utils/useResponsiveSize";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


export function InstructorJoiningScreen({ onClickCreateMeeting }) {
    const { user } = useContext(UserContext);
    const [signUp, setSignUp] = useState(true)
    const logOut = () => {
        signOut(auth)
    }
    const padding = useResponsiveSize({
        xl: 6,
        lg: 6,
        md: 6,
        sm: 4,
        xs: 1.5,
    });

    return (
        <Box
            m={6}
            style={{
                display: "flex",
                flex: 1,
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: padding,
            }}>
            {user ?
                (
                    <>
                        <Button

                            color="primary"
                            variant="contained"
                            onClick={(e) => {
                                onClickCreateMeeting();
                            }}>
                            Create Meeting
                        </Button>
                        <Button
                            style={{ marginTop: "1rem" }}
                            color="error"
                            variant="contained"
                            onClick={(e) => {
                                logOut();
                            }}>
                            Log out
                        </Button>
                    </>

                ) : (
                    <>
                        {

                            signUp ? <SignUp onClickSignIn={(e) => setSignUp(e)} /> : <SignIn onClickSignUp={(e) => setSignUp(e)} />
                        }
                    </>

                )
            }


        </Box>
    );
}
