import { Button, Chip } from "@material-ui/core";
import React, { useState } from "react";
import Grid from '@mui/material/Grid';

export function SelectType({ onClickSelectType }) {

    return (

        <Grid container spacing={3} style={{
            border: "1px solid #383752",
            borderRadius: "5px",
            padding: "30px 0px",
            width: "60%",
            margin: "auto",
        }}>
            <Grid item xs={12} style={{
                display: "flex",
                justifyContent: "center",

            }}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={(e) => {
                        onClickSelectType(true);
                    }}>
                    Continue as Instructor
                </Button>
            </Grid>
            <Grid item xs={12} style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "0px",
            }}>
                <span style={{
                    color: "white",
                    fontSize: "0.75rem",
                }} >
                    OR
                </span>
            </Grid>
            <Grid item xs={12} style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Button
                    color="primary"
                    variant="outlined"
                    style={{
                        color: "white",
                    }}
                    onClick={(e) => {
                        onClickSelectType(false);
                    }}>
                    Continue as Student
                </Button>
            </Grid>

        </Grid>
    );
}
