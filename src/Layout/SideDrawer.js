import React from "react";
import NavigationItems from "./NavigationItems";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

export default function SwipeableTemporaryDrawer({ open, onDrawer }) {
    const classes = useStyles();

    const toggleDrawer = (o) => (event) => {
        if (event?.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        onDrawer(o);
    };

    return (
        <div>
            <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <NavigationItems />
                </div>
            </SwipeableDrawer>
        </div>
    );
}
