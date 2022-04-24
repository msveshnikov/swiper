import React from "react";
import NavigationItems from "./NavigationItems";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles({
    list: {
        width: "300",
    },
});

export default function SwipeableTemporaryDrawer({ open, onDrawer }) {
    const classes = useStyles();

    const toggleDrawer = (o) => (event) => {
        onDrawer(o);
    };

    return (
        <div>
            <SwipeableDrawer
                hysteresis={0.3}
                minFlingVelocity={250}
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className={classes.list} role="presentation" onClick={toggleDrawer(false)}>
                    <NavigationItems />
                </div>
            </SwipeableDrawer>
        </div>
    );
}
